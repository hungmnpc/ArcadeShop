package com.monopoco.arcade.api;

import com.monopoco.arcade.modal.CategoryDTO;
import com.monopoco.arcade.request.ListProductID;
import com.monopoco.arcade.service.productservice.ProductService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author: hungdinh
 * Date created: 24/03/2023
 */

@RestController
@RequestMapping("/api/v1/categories")
@Slf4j
public class CategoryController {

    @Autowired
    private ProductService productService;

    @GetMapping("")
    public ResponseEntity<List<CategoryDTO>> getCategories() {
        return ResponseEntity.ok(productService.getCategories());
    }

    @GetMapping("/{categoryName}")
    public ResponseEntity<CategoryDTO> getCategoryByName(@PathVariable String categoryName) {
        CategoryDTO categoryDTO = productService.getCategoryByCategoryName(categoryName);
        if (categoryDTO != null) {
            return ResponseEntity.ok(categoryDTO);
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{categoryName}/products/{productID}")
    public ResponseEntity<?> removeProductFromCategory(
            @PathVariable String categoryName, @PathVariable Long productID) {
        Boolean success = productService.removeProductFromCategory(categoryName, productID);
        return success ? ResponseEntity.ok().build() : ResponseEntity.badRequest().build();
    }

    @PostMapping("/{categoryName}/products")
    public ResponseEntity<CategoryDTO> addProductToCategory(
            @PathVariable String categoryName,
            @RequestBody ListProductID productIDs
    ) {
        log.info(categoryName);
        log.info("{}", productIDs.getProductIDs());
        CategoryDTO categoryDTO = productService.addProductsToCategory(categoryName, productIDs.getProductIDs());
        if (categoryDTO != null) {
            return ResponseEntity.ok(categoryDTO);
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

}