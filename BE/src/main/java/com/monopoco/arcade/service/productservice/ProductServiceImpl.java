package com.monopoco.arcade.service.productservice;

import com.monopoco.arcade.entity.*;
import com.monopoco.arcade.modal.CategoryDTO;
import com.monopoco.arcade.modal.ProductDTO;
import com.monopoco.arcade.repository.*;
import com.monopoco.arcade.request.ProductRequest;
import com.monopoco.arcade.service.imageservice.ImageStorageService;
import com.monopoco.arcade.utils.MapperUtil;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.util.*;
import java.util.concurrent.TimeUnit;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@Transactional
@Slf4j
public class ProductServiceImpl implements ProductService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private InventoryRepository inventoryRepository;

    @Autowired
    private AdditionalInfoTitleRepository additionalInfoTitleRepository;

    @Autowired
    private DiscountModeRepository discountModeRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ImageStorageRepository imageStorageRepository;

    @Autowired
    private ImageStorageService imageStorageService;

    @Autowired
    private RedisTemplate redisTemplate;

    @Autowired
    private ModelMapper modelMapper;
    @Override
    public String saveCategory(String categoryName) {
        Category category = new Category(categoryName.toUpperCase(),categoryName, null, null);
        Category categorySaved = categoryRepository.save(category);
        if (categorySaved != null) {
            return categorySaved.getCategoryName();
        } else {
            return "Fail to save new category";
        }
    }

    @Override
    public String saveAdditionalInfoTitle(String title) {
        AdditionalInfoTitle additionalInfoTitle = new AdditionalInfoTitle(title.toUpperCase(), title);
        AdditionalInfoTitle additionalInfoTitleSaved = additionalInfoTitleRepository.save(additionalInfoTitle);
        return additionalInfoTitleSaved.getTitle();
    }

    @Override
    public String saveDiscountMode(String mode) {
        DiscountMode discountMode = new DiscountMode(mode.toUpperCase(), mode, null);
        DiscountMode discountModeSaved = discountModeRepository.save(discountMode);
        return discountModeSaved.getDiscountMode();
    }

    @Override
    public ProductDTO saveProduct(ProductRequest productRequest) {

//        log.info("{}", productRequest.getImagesId());
        Product product = new Product(null, productRequest.getName().trim(),
                productRequest.getDescription(), productRequest.getPrice(),
                productRequest.getRibbon(), productRequest.getSKU(), productRequest.isVisible(),
                discountModeRepository.findByDiscountMode(productRequest.getDiscountMode()),
                productRequest.getDiscountValue(),
                inventoryRepository.findInventoryByType(productRequest.getInventoryStatus()),
                null, null, null,
                null,null,null,
                new HashSet<>(),null, new HashSet<>(), productRequest.getQuantity());

        Product productSaved = productRepository.save(product);

        List<String> titles = new ArrayList<>(productRequest.getAdditionalInfo().keySet());

        for (int i = 0; i < 3; i++) {
            AdditionalInfoTitle additionalInfoTitle;
            String additionalInfoDescription = "";
            try {
                additionalInfoTitle = additionalInfoTitleRepository.findAdditionalInfoTitleByTitle(titles.get(i));
                if (additionalInfoTitle == null) {
                    String newAdditionalInfoTitle = saveAdditionalInfoTitle(titles.get(i));
                    additionalInfoTitle = additionalInfoTitleRepository.findAdditionalInfoTitleByTitle(newAdditionalInfoTitle);
                }
                additionalInfoDescription = productRequest.getAdditionalInfo().get(additionalInfoTitle.getTitle());
            } catch (Exception exception) {
                additionalInfoTitle = additionalInfoTitleRepository.findAdditionalInfoTitleByTitle("Empty");
            }
            switch (i) {
                case 0:
                {
                    productSaved.setAdditionalInfoTitle1(additionalInfoTitle);
                    productSaved.setAdditionalInfoDescription1(additionalInfoDescription);
                }
                break;
                case 1:
                {
                    productSaved.setAdditionalInfoTitle2(additionalInfoTitle);
                    productSaved.setAdditionalInfoDescription2(additionalInfoDescription);
                }
                break;
                case 2: {
                    productSaved.setAdditionalInfoTitle3(additionalInfoTitle);
                    productSaved.setAdditionalInfoDescription3(additionalInfoDescription);
                }
                break;
                default:
                    break;
            }
        }

        productRequest.getImagesId().forEach(imageId -> {
            Optional<Image> image = imageStorageRepository.findById(imageId);
            log.info("{}", image.get().getId());
            if (image.isPresent()) {
                if (productRequest.getImagesId().indexOf(imageId) == 0) {
                    productSaved.setMainImage(image.get());
                }
                image.get().setProduct(productSaved);
                productSaved.getImages().add(image.get());

            }
        });


        productRequest.getCategories().forEach(categoryName -> {
            Optional<Category> category = categoryRepository.findByCategoryName(categoryName);
            category.ifPresent(value -> productSaved.getCategories().add(value));
        });

        productSaved.getCategories().add(categoryRepository.findByCategoryName("All").get());
        log.info("{}", productSaved.getMainImage().getId());
        return MapperUtil.productMapper(productSaved, modelMapper, imageStorageService);
    }

    @Override
    public String saveInventory(String inventory) {
        Inventory inventoryE = new Inventory(inventory.toUpperCase(), inventory, null);
        Inventory inventorySaved = inventoryRepository.save(inventoryE);

        return inventorySaved.getId();
    }

    @Override
    public Page<ProductDTO> getProducts(Pageable pageable, String categoryName, String excludeCategoryName, String price,
                                        String sort) {
        Optional<Category> category = categoryRepository.findByCategoryName(categoryName);
        Page<Product> productPage = productRepository.findProductsByCategoriesContaining(pageable, category.get());
        if (!excludeCategoryName.equals("none")) {
            Category excludeCategory = categoryRepository.findByCategoryName(excludeCategoryName).get();
            List<ProductDTO> productList = productPage.getContent().stream()
                    .filter(product -> !product.getCategories().contains(excludeCategory))
                    .map(product -> MapperUtil.productMapper(product, modelMapper, imageStorageService))
                    .collect(Collectors.toList());
            return new PageImpl<ProductDTO>(productList);
        }
        return productPage.map(new Function<Product, ProductDTO>() {
            @Override
            public ProductDTO apply(Product product) {
                return MapperUtil.productMapper(product, modelMapper, imageStorageService);
            }
        });
    }

    @Override
    public ProductDTO getProductById(Long id) {
        Optional<Product> product = productRepository.findById(id);
        return product.map(value -> MapperUtil.productMapper(value, modelMapper, imageStorageService)).orElse(null);
    }

    @Override
    public List<ProductDTO> getBestGame() {

        List<ProductDTO> productDTOList = new ArrayList<>();
        if (redisTemplate.opsForHash().hasKey("PRODUCT", "BESTGAME")) {
            productDTOList = (List<ProductDTO>) redisTemplate.opsForHash().get("PRODUCT", "BESTGAME");
        } else {
            List<Product> productList = productRepository.bestGame();
            productDTOList = productList.stream()
                    .map(product -> MapperUtil.productMapper(product, modelMapper, imageStorageService))
                    .collect(Collectors.toList());
            redisTemplate.opsForHash().put("PRODUCT", "BESTGAME", productDTOList);
            redisTemplate.expire("PRODUCT", 60 , TimeUnit.MINUTES);
        }
            return productDTOList;
        }

    @Override
    public ProductDTO updateProduct(ProductRequest newProductRequest, Long id) {
        log.info("{}", newProductRequest.getQuantity());
        Product productExist = productRepository.findById(id).map(product -> {
            product.setName(newProductRequest.getName().trim());
            product.setDescription(newProductRequest.getDescription());
            product.setDiscountValue(newProductRequest.getDiscountValue());
            product.setPrice(newProductRequest.getPrice());
            product.setSKU(newProductRequest.getSKU());
            product.setQuantity(newProductRequest.getQuantity());
            product.setRibbon(newProductRequest.getRibbon());
            product.setVisible(newProductRequest.isVisible());
            product.setInventory(inventoryRepository.findInventoryByType(newProductRequest.getInventoryStatus()));
            Set<Category> newCategory = new HashSet<Category>();
            newProductRequest.getCategories().forEach(categoryName -> {
                Category category = categoryRepository.findByCategoryName(categoryName).get();
                newCategory.add(category);
            });
            product.setCategories(newCategory);
            product.getImages().forEach(image -> {
                image.setProduct(null);
            });
            product.getImages().clear();
            newProductRequest.getImagesId().forEach(imageId -> {
                Optional<Image> image = imageStorageRepository.findById(imageId);
                image.ifPresent(value -> value.setProduct(product));
                image.ifPresent(value -> product.getImages().add(value));
                if (newProductRequest.getImagesId().indexOf(imageId) == 0) {
                    log.info("{}", imageId);
                    image.ifPresent(product::setMainImage);
                }
            });
            List<String> titles = new ArrayList<>(newProductRequest.getAdditionalInfo().keySet());
            for (int i = 0; i < 3; i++) {
                AdditionalInfoTitle additionalInfoTitle;
                String additionalInfoDescription = "";
                try {
                    additionalInfoTitle = additionalInfoTitleRepository.findAdditionalInfoTitleByTitle(titles.get(i));
                    if (additionalInfoTitle == null) {
                        String newAdditionalInfoTitle = saveAdditionalInfoTitle(titles.get(i));
                        additionalInfoTitle = additionalInfoTitleRepository.findAdditionalInfoTitleByTitle(newAdditionalInfoTitle);
                    }
                    additionalInfoDescription = newProductRequest.getAdditionalInfo().get(additionalInfoTitle.getTitle());
                } catch (Exception exception) {
                    additionalInfoTitle = additionalInfoTitleRepository.findAdditionalInfoTitleByTitle("Empty");
                }
                switch (i) {
                    case 0:
                    {
                        product.setAdditionalInfoTitle1(additionalInfoTitle);
                        product.setAdditionalInfoDescription1(additionalInfoDescription);
                    }
                    break;
                    case 1:
                    {
                        product.setAdditionalInfoTitle2(additionalInfoTitle);
                        product.setAdditionalInfoDescription2(additionalInfoDescription);
                    }
                    break;
                    case 2: {
                        product.setAdditionalInfoTitle3(additionalInfoTitle);
                        product.setAdditionalInfoDescription3(additionalInfoDescription);
                    }
                    break;
                    default:
                        break;
                }
            }
            return productRepository.save(product);
        }).orElseGet(() -> null);
        if (productExist != null) {
            return MapperUtil.productMapper(productExist, modelMapper, imageStorageService);
        } else {
            return null;
        }
    }

    @Override
    public Long deleteProduct(Long id) {
        Optional<Product> productOptional = productRepository.findById(id);
        if (productOptional.isPresent()) {
            productOptional.get().getImages().forEach(image -> {
                image.setProduct(null);
            });
            productRepository.deleteById(id);
            return id;
        }
        return null;
    }

    @Override
    public List<CategoryDTO> getCategories() {
        List<Category> categories = categoryRepository.findAll();
        return categories.stream()
                .map(category -> MapperUtil.categoryMapper(category, modelMapper, imageStorageService))
                .collect(Collectors.toList());
    }

    @Override
    public CategoryDTO getCategoryByCategoryName(String categoryName) {
        Optional<Category> category = categoryRepository.findByCategoryName(categoryName);
        return category.map(value -> MapperUtil.categoryMapper(value, modelMapper, imageStorageService)).orElse(null);
    }

    @Override
    public boolean removeProductFromCategory(String categoryName, Long productID) {
        Optional<Category> category = categoryRepository.findByCategoryName(categoryName);
        Optional<Product> product = productRepository.findById(productID);
        if (category.isPresent() && product.isPresent()) {
            product.get().getCategories().remove(category.get());
            return true;
        }
        return false;
    }

    @Override
    public CategoryDTO addProductsToCategory(String categoryName, List<Long> productIDs) {
        Optional<Category> categoryOptional = categoryRepository.findByCategoryName(categoryName);
        categoryOptional.ifPresent(category -> productIDs.forEach(id -> {
            Optional<Product> product = productRepository.findById(id);
            if (product.isPresent()) {
                product.get().getCategories().add(category);
                category.getProducts().add(product.get());
            }
        }));
        return categoryOptional.map(value -> MapperUtil.categoryMapper(value, modelMapper, imageStorageService)).orElse(null);
    }

    @Override
    public List<ProductDTO> getProductWithExcludeCategory(String categoryName) {
        Optional<Category> category = categoryRepository.findByCategoryName(categoryName);
        if (category.isPresent()) {
            List<Product> productList = productRepository.findProductsByCategoriesNotContains(category.get());
            List<ProductDTO> productDTOList = productList.stream().map(product ->
                 MapperUtil.productMapper(product, modelMapper, imageStorageService)
            ).collect(Collectors.toList());
        }
        return null;
    }

    @Override
    public List<ProductDTO> getBestSeller() {
        List<ProductDTO> productDTOList = new ArrayList<>();
        if (redisTemplate.opsForHash().hasKey("PRODUCT", "BESTSELLER")) {
            productDTOList = (List<ProductDTO>) redisTemplate.opsForHash().get("PRODUCT", "BESTSELLER");
        } else {
            List<Product> productList = productRepository.bestSeller();
            productDTOList = productList.stream()
                    .map(product -> MapperUtil.productMapper(product, modelMapper, imageStorageService))
                    .collect(Collectors.toList());
            redisTemplate.opsForHash().put("PRODUCT", "BESTSELLER", productDTOList);
            redisTemplate.expire("PRODUCT", 60 , TimeUnit.MINUTES);
        }
        return productDTOList;
    }

    @Override
    public List<ProductDTO> filterProduct(String price, String categoryId, String columnSort, String sortType, String mainCategory) {
        Integer priceMin = Integer.valueOf(price.split("-")[0]);
        Integer priceMax = Integer.valueOf(price.split("-")[1]);
        List<Product> productList = productRepository.filterProducts(priceMin, priceMax, categoryId, columnSort, sortType, mainCategory);
        List<ProductDTO> productDTOList = productList.stream()
                .map(product -> MapperUtil.productMapper(product, modelMapper, imageStorageService))
                .collect(Collectors.toList());
        return productDTOList;
    }

    @Override
    public List<ProductDTO> upgradeGear() {
        List<ProductDTO> productDTOList = new ArrayList<>();
        if (redisTemplate.opsForHash().hasKey("PRODUCT", "UPGRADEGEAR")) {
            productDTOList = (List<ProductDTO>) redisTemplate.opsForHash().get("PRODUCT", "UPGRADEGEAR");
        } else {
            List<Product> productList = productRepository.upgradeGear();
            productDTOList = productList.stream()
                    .map(product -> MapperUtil.productMapper(product, modelMapper, imageStorageService))
                    .collect(Collectors.toList());
            redisTemplate.opsForHash().put("PRODUCT", "UPGRADEGEAR", productDTOList);
            redisTemplate.expire("PRODUCT", 60 , TimeUnit.MINUTES);
        }
        return productDTOList;
    }

    @Override
    public List<CategoryDTO> getAllCategoryByType(String type) {
        List<Category> categoryList = categoryRepository.getAllCategoryByOneType(type);
        List<CategoryDTO> categoryDTOList = categoryList.stream()
                .map(category -> {
                    CategoryDTO categoryDTO = MapperUtil.categoryMapper(category, modelMapper, imageStorageService);
                    categoryDTO.setProducts(null);
                    return categoryDTO;
                })
                .collect(Collectors.toList());
        return categoryDTOList;
    }
}
