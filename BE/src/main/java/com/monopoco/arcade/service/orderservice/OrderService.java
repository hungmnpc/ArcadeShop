package com.monopoco.arcade.service.orderservice;

import com.monopoco.arcade.entity.Status;
import com.monopoco.arcade.modal.OrderDTO;
import com.monopoco.arcade.request.OrderRequest;

import java.util.List;

/**
 * @author: hungdinh
 * Date created: 11/04/2023
 */
public interface OrderService {

    public OrderDTO createNewOrder(OrderRequest orderRequest);

    public List<OrderDTO> getAllOrderByUser();

    public OrderDTO cancelOrder(Long id);

    public OrderDTO updateStatusOrder(Long id, Status status);

    public List<OrderDTO> getAllOrder(List<Integer> status);
}