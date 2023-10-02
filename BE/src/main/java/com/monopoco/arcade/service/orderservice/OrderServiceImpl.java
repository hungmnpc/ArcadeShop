package com.monopoco.arcade.service.orderservice;

import com.monopoco.arcade.entity.*;
import com.monopoco.arcade.modal.OrderDTO;
import com.monopoco.arcade.repository.CartRepository;
import com.monopoco.arcade.repository.OrderDetailRepository;
import com.monopoco.arcade.repository.OrderRepository;
import com.monopoco.arcade.repository.UserRepository;
import com.monopoco.arcade.request.OrderRequest;
import com.monopoco.arcade.service.imageservice.ImageStorageService;
import com.monopoco.arcade.utils.MapperUtil;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicReference;
import java.util.stream.Collectors;

/**
 * @author: hungdinh
 * Date created: 11/04/2023
 */

@Service
@Transactional
@Slf4j
public class OrderServiceImpl implements OrderService{

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderDetailRepository orderDetailRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private ImageStorageService imageStorageService;

    @Override
    public OrderDTO createNewOrder(OrderRequest orderRequest) {
        Long userId = (Long) ((Map) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).get("id");
        User user = userRepository.findById(userId).orElse(null);
        Order order = new Order(null, user, new Date(), null, Status.PROCESSING, null);
        AtomicReference<Boolean> failure = new AtomicReference<>(false);
        List<OrderDetail> orderDetails = orderRequest.getCartIds().stream()
                .map(id -> {
                    Cart cart = cartRepository.findById(id).orElse(null);
                    if (cart.getQuantity() > cart.getProduct().getQuantity()) {
                        failure.set(true);
                        
                    }
                    if (cart != null && cart.getUser().equals(user)) {
                        OrderDetail orderDetail = new OrderDetail(null, order, cart.getProduct(), cart.getQuantity());
                        cartRepository.deleteById(cart.getId());
                        return orderDetail;
                    } else {
                        return null;
                    }
                }).collect(Collectors.toList());
        order.setOrderDetails(orderDetails);
        Order orderSaved = orderRepository.save(order);

        if (orderSaved.getId() > 0) {
            return MapperUtil.orderMapper(orderSaved, modelMapper, imageStorageService);
        }
        return null;
    }

    @Override
    public List<OrderDTO> getAllOrderByUser() {
        Long userId = (Long) ((Map) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).get("id");
        List<Order> orderList = orderRepository.getAllOrderByUserId(userId);
        List<OrderDTO> orderDTOList = orderList.stream()
                .map(order -> MapperUtil.orderMapper(order, modelMapper, imageStorageService))
                .collect(Collectors.toList());
        return orderDTOList;
    }

    @Override
    public OrderDTO cancelOrder(Long id) {
        return null;
    }

    @Override
    public OrderDTO updateStatusOrder(Long id,Status status) {
        Order order = orderRepository.findById(id).orElse(null);
        log.info(status.toString());
        if (order != null) {
            if (status.equals(Status.ACCOMPLISHED)) {
                order.setShippedDate(new Date());
            }
            order.setStatus(status);
            return MapperUtil.orderMapper(order, modelMapper, imageStorageService);
        }
        log.info("NULL");
        return null;
    }

    @Override
    public List<OrderDTO> getAllOrder(List<Integer> status) {
        List<Order> orderList = orderRepository.getAllOrderFilter(status);
        List<OrderDTO> orderDTOList = orderList.stream()
                .map(order -> MapperUtil.orderMapper(order, modelMapper, imageStorageService))
                .collect(Collectors.toList());
        return orderDTOList;
    }
}