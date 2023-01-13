package com.monopoco.arcade.api;

import com.monopoco.arcade.entity.Image;
import com.monopoco.arcade.request.ImageRequest;
import com.monopoco.arcade.service.imageservice.ImageStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Base64;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/images")
public class ImageController {

    @Autowired
    private ImageStorageService imageStorageService;

    @PostMapping(path = "")
    public ResponseEntity<?> uploadImage(@ModelAttribute ImageRequest request) throws IOException{
        Long imageId = imageStorageService.uploadImage(request.getImageFile());
        if (imageId > 0) {
            return ResponseEntity.ok(imageId);
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getImage(@PathVariable Long id) {
        byte[] imageData = imageStorageService.downloadImage(id);
        String imageBase64 = Base64.getEncoder().encodeToString(imageData);
        return ResponseEntity.status(HttpStatus.OK)
                .body(imageBase64);
    }

}
