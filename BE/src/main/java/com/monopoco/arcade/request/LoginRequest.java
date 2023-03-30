package com.monopoco.arcade.request;

import lombok.*;

/**
 * @author: hungdinh
 * Date created: 16/03/2023
 */
@ToString
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LoginRequest {
    private String email;

    private String password;
}