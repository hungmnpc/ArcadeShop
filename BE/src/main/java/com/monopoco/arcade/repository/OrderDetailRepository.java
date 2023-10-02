package com.monopoco.arcade.repository;

import com.monopoco.arcade.entity.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author: hungdinh
 * Date created: 11/04/2023
 */

@Repository
public interface OrderDetailRepository extends JpaRepository<OrderDetail, Long> {
}
