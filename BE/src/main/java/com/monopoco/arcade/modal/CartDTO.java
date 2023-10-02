package com.monopoco.arcade.modal;

import lombok.*;

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
public class CartDTO implements Serializable {

    private Long id;

    private ProductDTO product;

    private Integer quantity;
}