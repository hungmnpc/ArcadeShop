package com.monopoco.arcade.request;

import lombok.*;

import java.util.List;

/**
 * @author: hungdinh
 * Date created: 06/04/2023
 */

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ListProductID {
    private List<Long> productIDs;
}