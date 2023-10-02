package com.monopoco.arcade.modal;

import com.monopoco.arcade.entity.OrderDetail;
import com.monopoco.arcade.entity.Status;
import com.monopoco.arcade.entity.User;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * @author: hungdinh
 * Date created: 11/04/2023
 */

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class OrderDTO implements Serializable {

    private Long id;

    private UserDTO user;

    private Date orderDate;

    private Date shippedDate;

    private String statusValue;

    private Integer statusNumber;

    List<OrderDetailDTO> orderDetails;

    private Double subTotal;
}