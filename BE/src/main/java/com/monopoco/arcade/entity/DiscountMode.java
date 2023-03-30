package com.monopoco.arcade.entity;

import lombok.*;

import javax.persistence.*;
import java.util.Set;

@Table(name = "discount_mode")
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class DiscountMode {

    @Id
    private String id;

    @Column(name = "discount_mode", nullable = false, unique = true)
    private String discountMode;

    @OneToMany(mappedBy = "discountMode")
    private Set<Product> productSet;

}
