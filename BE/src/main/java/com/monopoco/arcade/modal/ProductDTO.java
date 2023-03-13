package com.monopoco.arcade.modal;

import lombok.*;

import java.util.Map;
import java.util.Set;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ProductDTO {
    private Long id;
    private String name;
    private Double price;
    private String ribbon;
    private String description;
    private String SKU;
    private boolean visible;
    private String discountModeName;

    private Double discountValue;

    private String inventoryStatus;

    private Map<String, String> additionalInfo;

    private Set<ImageDTO> imageSet;


    private Set<String> categoriesName;
}
