package com.monopoco.arcade.api;

import com.monopoco.arcade.entity.Status;
import com.monopoco.arcade.modal.OrderDTO;
import com.monopoco.arcade.request.OrderRequest;
import com.monopoco.arcade.service.orderservice.OrderService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

/**
 * @author: hungdinh
 * Date created: 11/04/2023
 */

@RestController
@RequestMapping("/api/v1/orders")
@Slf4j
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("")
    public ResponseEntity<?> createNewOrder(@RequestBody OrderRequest orderRequest) {
        log.info("{}", orderRequest.toString());
        try {
            OrderDTO orderDTO = orderService.createNewOrder(orderRequest);
            if (orderDTO != null) {
                return ResponseEntity.ok(orderDTO);
            } else {
                return ResponseEntity.badRequest().build();
            }
        } catch (Exception exception) {
            log.error(exception.getMessage());
            return ResponseEntity.internalServerError().body(exception.getMessage());
        }
    }

    @GetMapping("")
    public ResponseEntity<?> getAllOrderByUser() {
        try {
            List<OrderDTO> orderDTOList = orderService.getAllOrderByUser();
            return ResponseEntity.ok(orderDTOList);
        } catch (Exception exception) {
            log.error(exception.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/admin")
    public ResponseEntity<?> getAllOrder(
            @RequestParam(defaultValue = "1,2,3,4") List<Integer> status
    ) {
        try {

            List<OrderDTO> orderDTOList = orderService.getAllOrder(status);
            return ResponseEntity.ok(orderDTOList);
        } catch (Exception e) {
            log.info(e.getMessage());
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateStatusOrder(@PathVariable Long id, @RequestBody Integer status) {
        try {
            OrderDTO orderDTO = orderService.updateStatusOrder(id, Status.of(status));
            if (orderDTO != null) {
                log.info("123");
                return ResponseEntity.ok(orderDTO);
            } else {
                log.info("456");
                return ResponseEntity.badRequest().build();
            }
        } catch (Exception exception) {
            log.error(exception.getMessage());
            return ResponseEntity.internalServerError().body(exception.getMessage());
        }
    }
}