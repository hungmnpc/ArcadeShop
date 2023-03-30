package com.monopoco.arcade.entity;

import lombok.*;

import javax.persistence.*;
import java.util.Set;

@Table(name = "inventory")
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Inventory {

    @Id
    private String id;

    @Column(name = "type", nullable = false, unique = true)
    private String type;

    @OneToMany(mappedBy = "inventory", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<Product> products;




}
