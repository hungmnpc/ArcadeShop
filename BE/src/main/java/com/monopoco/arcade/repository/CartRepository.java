package com.monopoco.arcade.repository;

import com.monopoco.arcade.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * @author: hungdinh
 * Date created: 11/04/2023
 */

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {

    @Query("select c from Cart c where c.user.id = :id")
    List<Cart> getCartsByUserId(@Param("id") Long id);

    @Query("select c from Cart c where c.user.id = :id and c.product.id = :pid")
    Optional<Cart> getExistedCart(@Param("id") Long userId, @Param("pid") Long productId);

    @Query("select c from Cart c where c.id in (:ids)")
    List<Cart> findCartsInIds(@Param("ids") List<Long> listId);
}
