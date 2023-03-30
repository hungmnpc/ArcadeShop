package com.monopoco.arcade.entity;


import lombok.*;

import javax.persistence.*;
import java.util.Set;

@Table(name = "caregories")
@Entity
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Category {
    @Id
    private String id;

    @Column(name = "category_name", unique = true)
    private String categoryName;

    @ManyToMany(mappedBy = "categories")
    private Set<Product> products;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "image_id", referencedColumnName = "id")
    private Image image;


}
