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
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.util.*;
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
        Product product = new Product(null, productRequest.getName(),
                productRequest.getDescription(), productRequest.getPrice(),
                productRequest.getRibbon(), productRequest.getSKU(), productRequest.isVisible(),
                discountModeRepository.findByDiscountMode(productRequest.getDiscountMode()),
                productRequest.getDiscountValue(),
                inventoryRepository.findInventoryByType(productRequest.getInventoryStatus()),
                null, null, null,
                null,null,null,
                new HashSet<>(), new HashSet<>());

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
            if (image.isPresent()) {
                image.get().setProduct(productSaved);
                productSaved.getImages().add(image.get());
            }
        });

        productRequest.getCategories().forEach(categoryName -> {
            Optional<Category> category = categoryRepository.findByCategoryName(categoryName);
            category.ifPresent(value -> productSaved.getCategories().add(value));
        });

        productSaved.getCategories().add(categoryRepository.findByCategoryName("All").get());
        return MapperUtil.productMapper(productSaved, modelMapper, imageStorageService);
    }

    @Override
    public String saveInventory(String inventory) {
        Inventory inventoryE = new Inventory(inventory.toUpperCase(), inventory, null);
        Inventory inventorySaved = inventoryRepository.save(inventoryE);

        return inventorySaved.getId();
    }

    @Override
    public Page<ProductDTO> getProducts(Pageable pageable, String categoryName) {
        Optional<Category> category = categoryRepository.findByCategoryName(categoryName);
        Page<Product> productPage = productRepository.findProductsByCategoriesContaining(pageable, category.get());
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
    public ProductDTO updateProduct(ProductRequest newProductRequest, Long id) {
        Product productExist = productRepository.findById(id).map(product -> {
            product.setName(newProductRequest.getName());
            product.setDescription(newProductRequest.getDescription());
            product.setDiscountValue(newProductRequest.getDiscountValue());
            product.setPrice(newProductRequest.getPrice());
            product.setSKU(newProductRequest.getSKU());
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
}