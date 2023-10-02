package com.monopoco.arcade.repository;

import com.monopoco.arcade.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author: hungdinh
 * Date created: 11/04/2023
 */

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    @Query("select o from Order o where o.user.id = :id")
    List<Order> getAllOrderByUserId(@Param("id") Long userId);


    @Query(value = "select * from orders o where o.status in (:status)", nativeQuery = true)
    List<Order> getAllOrderFilter(@Param("status") List<Integer> status);
}
