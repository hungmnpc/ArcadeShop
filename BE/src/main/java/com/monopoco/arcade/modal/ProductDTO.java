package com.monopoco.arcade.modal;

import lombok.*;

import java.io.Serializable;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ProductDTO implements Serializable {
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

    private Long mainImageId;

    private Map<String, String> additionalInfo;

    private List<ImageDTO> imageSet;

    private Set<String> categoriesName;

    private Integer quantity;
}
