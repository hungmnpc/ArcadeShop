package com.monopoco.arcade.api;

import com.monopoco.arcade.modal.CategoryDTO;
import com.monopoco.arcade.service.productservice.ProductService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}