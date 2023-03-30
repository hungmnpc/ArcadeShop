package com.monopoco.arcade.entity;


import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "images")
@Getter
@ToString
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String type;

    @Column(name = "image_data", length = 1000)
    @Lob
    private byte[] imageData;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @OneToOne(mappedBy = "image")
    private Category category;


}
