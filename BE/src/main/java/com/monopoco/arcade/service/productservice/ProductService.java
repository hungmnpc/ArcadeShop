package com.monopoco.arcade.service.productservice;

import com.monopoco.arcade.modal.CategoryDTO;
import com.monopoco.arcade.modal.ProductDTO;
import com.monopoco.arcade.request.ProductRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import javax.servlet.http.PushBuilder;
import java.util.List;


public interface ProductService {
    public String saveCategory(String categoryName);

    public String saveAdditionalInfoTitle(String title);

    public String saveDiscountMode(String mode);

    public String saveInventory(String inventory);

    public ProductDTO saveProduct(ProductRequest productRequest);

    public Page<ProductDTO> getProducts(Pageable pageable, String categoryName, String excludeCategoryName, String price, String sort);

    public List<ProductDTO> getProductWithExcludeCategory(String categoryName);

    public ProductDTO getProductById(Long id);

    public ProductDTO updateProduct(ProductRequest newProductRequest, Long id);

    public Long deleteProduct(Long id);

    public List<CategoryDTO> getCategories();

    public CategoryDTO getCategoryByCategoryName(String categoryName);

    public boolean removeProductFromCategory(String categoryName, Long productID);

    public CategoryDTO addProductsToCategory(String categoryName, List<Long> productIDs);

    public List<ProductDTO> getBestSeller();

    public List<ProductDTO> upgradeGear();

    public List<ProductDTO> getBestGame();

    public List<ProductDTO> filterProduct(String price, String categoryId, String columnSort, String sortType, String mainCategory);

    public List<CategoryDTO> getAllCategoryByType(String type);
}