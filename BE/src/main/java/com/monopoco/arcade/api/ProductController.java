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
import org.springframework.data.domain.Sort;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.*;

@RestController
@RequestMapping("/api/v1/admin/products")
@Slf4j
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private RedisTemplate redisTemplate;

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
            @RequestParam(defaultValue = "All") String category,
            @RequestParam(defaultValue = "0-3000") String price,
            @RequestParam(defaultValue = "none") String sort,
            @RequestParam(defaultValue = "none", name = "exclude_category") String excludeCategory
    ) {
        Pageable pageable = PageRequest.of(page, size);
        Page<ProductDTO> productDTOPage = productService.getProducts(pageable, category, excludeCategory, price, sort);
        List<ProductDTO> productDTOList = productDTOPage.getContent();
        Map<String, Object> response = new HashMap<>();
        response.put("products", productDTOList);
        response.put("currentPage", productDTOPage.getNumber());
        response.put("totalItems", productDTOPage.getTotalElements());
        response.put("totalPages", productDTOPage.getTotalPages());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/filter")
    public ResponseEntity<?> filterProduct(
            @RequestParam(defaultValue = "0-30000") String price,
            @RequestParam(defaultValue = "ALL") String categoryId,
            @RequestParam(defaultValue = "id") String column,
            @RequestParam(defaultValue = "DESC") String sortType,
            @RequestParam(defaultValue = "ALL") String mainCategory
    ) {
        try {
            log.info("{}", column);
            List<ProductDTO> productDTOList = productService.filterProduct(price, categoryId, column, sortType, mainCategory);
            return ResponseEntity.ok(productDTOList);
        } catch (Exception e) {
            log.error(e.getMessage());
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    /**
     * Get Image of Product
     * @param id
     * @return
     */
    @GetMapping("/{id}/images")
    public ResponseEntity<List<ImageDTO>> getImagesOfProduct(@PathVariable Long id) {
        ProductDTO productDTO = productService.getProductById(id);
        List<ImageDTO> imageDTOList =  productDTO.getImageSet();
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

    @GetMapping("/best_seller")
    public ResponseEntity<?> getBestSeller(HttpServletRequest request) {
        try {
            List<ProductDTO> productDTOList = productService.getBestSeller();
            return ResponseEntity.ok(productDTOList);
        } catch (Exception e) {
            log.error(e.getMessage());
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @GetMapping("/upgrade_gear")
    public ResponseEntity<?> getUpgradeGear() {
        try {
            List<ProductDTO> productDTOList = productService.upgradeGear();
            return ResponseEntity.ok(productDTOList);
        } catch (Exception e) {
            log.error(e.getMessage());
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @GetMapping("/best_game")
    public ResponseEntity<?> getBestGame() {
        try {
            List<ProductDTO> productDTOList = productService.getBestGame();
            return ResponseEntity.ok(productDTOList);
        } catch (Exception e) {
            log.error(e.getMessage());
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }
}
