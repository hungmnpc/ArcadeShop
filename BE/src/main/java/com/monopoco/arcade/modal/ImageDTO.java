package com.monopoco.arcade.modal;

import lombok.*;

/**
 * @author: hungdinh
 * Date created: 04/03/2023
 */

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ImageDTO {

    private Long id;
    private String imageBase64;
    private String name;


}