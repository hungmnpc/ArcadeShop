package com.monopoco.arcade.modal;

import com.monopoco.arcade.entity.Order;
import com.monopoco.arcade.entity.Product;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

/**
 * @author: hungdinh
 * Date created: 11/04/2023
 */

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class OrderDetailDTO implements Serializable {

    private Long id;

    private ProductDTO product;

    private Integer quantity;
}