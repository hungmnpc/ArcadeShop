package com.monopoco.arcade.modal;

import com.monopoco.arcade.entity.Image;
import com.monopoco.arcade.entity.Product;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;

/**
 * @author: hungdinh
 * Date created: 23/03/2023
 */

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class CategoryDTO implements Serializable {

    private String id;

    private String categoryName;

    private Set<ProductDTO> products;

    private ImageDTO image;
}