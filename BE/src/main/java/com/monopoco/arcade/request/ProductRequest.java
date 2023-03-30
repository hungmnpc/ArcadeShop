package com.monopoco.arcade.request;

import lombok.*;

import java.time.Year;
import java.util.Map;
import java.util.Set;

@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ProductRequest {

    private String name;

    private String ribbon;

    private String description;

    private Set<String> categories;

    private boolean visible;

    private Set<Long> imagesId;

    private Map<String, String> additionalInfo;

    private Double price;

    private String discountMode;

    private Double discountValue;

    private String SKU;
    private String inventoryStatus;
}
