package com.monopoco.arcade.service.productservice;

import com.monopoco.arcade.entity.*;
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
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.function.Function;

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
            Category category = categoryRepository.findByCategoryName(categoryName);
            productSaved.getCategories().add(category);
        });

        productSaved.getCategories().add(categoryRepository.findByCategoryName("All"));
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
        Category category = categoryRepository.findByCategoryName(categoryName);
        Page<Product> productPage = productRepository.findProductsByCategoriesContaining(pageable, category);
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
}
