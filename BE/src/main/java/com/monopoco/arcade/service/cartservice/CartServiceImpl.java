package com.monopoco.arcade.service.cartservice;

import com.monopoco.arcade.entity.Cart;
import com.monopoco.arcade.entity.Product;
import com.monopoco.arcade.entity.User;
import com.monopoco.arcade.modal.CartDTO;
import com.monopoco.arcade.modal.UserDTO;
import com.monopoco.arcade.repository.CartRepository;
import com.monopoco.arcade.repository.ProductRepository;
import com.monopoco.arcade.repository.UserRepository;
import com.monopoco.arcade.service.imageservice.ImageStorageService;
import com.monopoco.arcade.utils.MapperUtil;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import java.io.Serializable;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * @author: hungdinh
 * Date created: 11/04/2023
 */

@Service
@Transactional
@Slf4j
public class CartServiceImpl implements CartService{

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private ImageStorageService imageStorageService;

    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    @Override
    public CartDTO newProductToCart(Long productId, Integer quantity, HttpServletRequest request) {
        if (quantity == 0) {
            return null;
        }
        Long userId = (Long) ((Map) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).get("id");
        User user = userRepository.findById(userId).orElse(null);
        Product product = productRepository.findById(productId).orElse(null);
        if (user != null && product != null) {
            Optional<Cart> cartExisted = cartRepository.getExistedCart(user.getId(), product.getId());
            if (cartExisted.isPresent()) {
                if(product.getQuantity() < cartExisted.get().getQuantity() + quantity) {
                    return null;
                }
                cartExisted.get().setQuantity(cartExisted.get().getQuantity() + quantity);
                return MapperUtil.cartMapper(cartExisted.get(), modelMapper, imageStorageService);
            } else {
                Cart cart = new Cart(null, user, product, quantity);
                Cart cartSaved = cartRepository.save(cart);
                if (cartSaved.getId() > 0) {
                    return MapperUtil.cartMapper(cartSaved, modelMapper, imageStorageService);
                }
            }
        }
        return null;
    }

    @Override
    public CartDTO updateCart(Long id, Integer quantity) {
        Optional<Cart> cart = cartRepository.findById(id);
        cart.ifPresent(value -> value.setQuantity(quantity));
        return MapperUtil.cartMapper(cart.get(), modelMapper, imageStorageService);
    }

    @Override
    public void deleteCart(Long id) {
        cartRepository.deleteById(id);
    }

    @Override
    public List<CartDTO> getCart() {
        Long userId = (Long) ((Map) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).get("id");
        List<Cart> cartList = cartRepository.getCartsByUserId(userId);
        List<CartDTO> cartDTOList = cartList.stream().map(
                cart -> MapperUtil.cartMapper(cart, modelMapper, imageStorageService)
        ).collect(Collectors.toList());
        return cartDTOList;
    }
}