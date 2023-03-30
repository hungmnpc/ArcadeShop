package com.monopoco.arcade.response;

import lombok.*;

/**
 * @author: hungdinh
 * Date created: 16/03/2023
 */

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class LoginResponse {

    private String accessToken;

    private String refreshToken;

    private String name;
}