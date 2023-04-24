package com.monopoco.arcade.entity;

import lombok.*;
import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "products")
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false, unique = true)
    private String name;

    @Lob
    @Column(name = "description")
    private String description;

    @Column(name = "price", nullable = false, columnDefinition = "Decimal(10,2)")
    private Double price;

    @Column(name = "ribbon")
    private String ribbon;

    @Column(name = "sku")
    private String SKU;

    @Column(name = "visible")
    private boolean visible = true;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "discount_mode_id")
    private DiscountMode discountMode;

    @Column(name = "discount_value", nullable = false, columnDefinition = "Decimal(5,1)")
    private Double discountValue;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "inventory_id")
    private Inventory inventory;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "additionalInfoTitle1")
    private AdditionalInfoTitle additionalInfoTitle1;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "additionalInfoTitle2")
    private AdditionalInfoTitle additionalInfoTitle2;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "additionalInfoTitle3")
    private AdditionalInfoTitle additionalInfoTitle3;

    @Lob
    @Column(name = "additionalInfoDescription1")
    private String additionalInfoDescription1;

    @Lob
    @Column(name = "additionalInfoDescription2")
    private String additionalInfoDescription2;

    @Lob
    @Column(name = "additionalInfoDescription3")
    private String additionalInfoDescription3;

    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY)
    private Set<Image> images;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "main_image_id", referencedColumnName = "id")
    private Image mainImage;

    @ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE, CascadeType.PERSIST,CascadeType.REFRESH})
    @JoinTable(
            name = "product_category",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id")
    )
    private Set<Category> categories;








}
