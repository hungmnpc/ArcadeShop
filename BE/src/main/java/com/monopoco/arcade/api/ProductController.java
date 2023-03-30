package com.monopoco.arcade.api;


import com.monopoco.arcade.modal.ImageDTO;
import com.monopoco.arcade.modal.ProductDTO;
import com.monopoco.arcade.request.ProductRequest;
import com.monopoco.arcade.service.productservice.ProductService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.*;

@RestController
@RequestMapping("/api/v1/admin/products")
@Slf4j
public class ProductController {

    @Autowired
    private ProductService productService;

    /**
     *
     * @param productRequest
     * @return
     */
    @PostMapping("")
    public ResponseEntity<ProductDTO> addNewProduct(@RequestBody ProductRequest productRequest) {
        ProductDTO productDTO = productService.saveProduct(productRequest);
        if (productDTO != null) {
            return ResponseEntity.ok(productDTO);
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductDTO> updateProduct(@RequestBody ProductRequest productRequest, @PathVariable Long id) {
        ProductDTO productDTO = productService.updateProduct(productRequest, id);
        if (productDTO != null) {
            return ResponseEntity.ok(productDTO);
        } else {
            return ResponseEntity.badRequest().build();
        }
    }


    @GetMapping("")
    public ResponseEntity<Map<String, Object>> getProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "100") int size,
            @RequestParam(defaultValue = "All") String category
    ) {
        Pageable pageable = PageRequest.of(page, size);
        Page<ProductDTO> productDTOPage = productService.getProducts(pageable, category);
        List<ProductDTO> productDTOList = productDTOPage.getContent();
        Map<String, Object> response = new HashMap<>();
        response.put("products", productDTOList);
        response.put("currentPage", productDTOPage.getNumber());
        response.put("totalItems", productDTOPage.getTotalElements());
        response.put("totalPages", productDTOPage.getTotalPages());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * Get Image of Product
     * @param id
     * @return
     */
    @GetMapping("/{id}/images")
    public ResponseEntity<Set<ImageDTO>> getImagesOfProduct(@PathVariable Long id) {
        ProductDTO productDTO = productService.getProductById(id);
        Set<ImageDTO> imageDTOList =  productDTO.getImageSet();
        return ResponseEntity.ok(imageDTOList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable Long id) {
        ProductDTO productDTO = productService.getProductById(id);
        if (productDTO != null) {
            return ResponseEntity.ok(productDTO);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProductById(@PathVariable Long id) {
        if (productService.deleteProduct(id) != null) {
            return ResponseEntity.status(HttpStatus.ACCEPTED).build();
        } else {
            return ResponseEntity.badRequest().body(String.format("Product ID = %d không tồn tại", id));
        }
    }
}
