package com.monopoco.arcade.request;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ImageRequest {

    private MultipartFile imageFile;

}
