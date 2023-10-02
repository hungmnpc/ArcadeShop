package com.monopoco.arcade.service.cartservice;

import com.monopoco.arcade.modal.CartDTO;
import com.monopoco.arcade.modal.UserDTO;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * @author: hungdinh
 * Date created: 11/04/2023
 */
public interface CartService {

    public CartDTO newProductToCart(Long productId, Integer quantity, HttpServletRequest request);

    public CartDTO updateCart(Long id, Integer quantity);

    public void deleteCart(Long id);

    public List<CartDTO> getCart();

}
