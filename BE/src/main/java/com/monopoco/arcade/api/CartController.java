package com.monopoco.arcade.api;

import com.monopoco.arcade.modal.CartDTO;
import com.monopoco.arcade.repository.UserRepository;
import com.monopoco.arcade.request.CartRequest;
import com.monopoco.arcade.request.QuantityRequest;
import com.monopoco.arcade.service.cartservice.CartService;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * @author: hungdinh
 * Date created: 11/04/2023
 */

@RestController
@RequestMapping("/api/v1/carts")
@Slf4j
public class CartController {

    @Autowired
    CartService cartService;

    @Autowired
    UserRepository userRepository;

    @PostMapping("")
    public ResponseEntity<?> addToCart(@RequestBody CartRequest request, HttpServletRequest httpServletRequest) {
        log.info("{}", request.toString());
        try {
            CartDTO cartDTO = cartService.newProductToCart(request.getProductId(), request.getQuantity(), httpServletRequest);
            if (cartDTO != null) {
                return ResponseEntity.ok(cartDTO);
            } else {
                return ResponseEntity.badRequest().build();
            }
        } catch (Exception exception) {
            log.error(exception.getMessage());
            return ResponseEntity.internalServerError().build();
        }

    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCart(@PathVariable Long id, @RequestBody QuantityRequest request) {
        try {
            CartDTO cartDTO = cartService.updateCart(id, request.getQuantity());
            return ResponseEntity.ok(cartDTO);
        } catch (Exception exception) {
            log.error(exception.getMessage());
            return ResponseEntity.internalServerError().body(exception.getMessage());
        }
    }

    @GetMapping("")
    public ResponseEntity<?> getCart() {
        try {
            List<CartDTO> cartDTOList = cartService.getCart();
            return ResponseEntity.ok(cartDTOList);
        } catch (Exception exception) {
            log.error(exception.getMessage());
            return ResponseEntity.internalServerError().body(exception.getMessage());
        }
    }

}