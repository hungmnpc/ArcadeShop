package com.monopoco.arcade.api;

import com.monopoco.arcade.entity.Image;
import com.monopoco.arcade.modal.ImageDTO;
import com.monopoco.arcade.request.ImageRequest;
import com.monopoco.arcade.service.imageservice.ImageStorageService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@RestController
@RequestMapping("/api/v1/images")
@Slf4j
public class ImageController {


    @Autowired
    private ImageStorageService imageStorageService;

    @PostMapping(path = "")
    public ResponseEntity<?> uploadImage(@ModelAttribute ImageRequest request,
                                         HttpServletRequest servletRequest) throws IOException{
        Long imageId = imageStorageService.uploadImage(request.getImageFile());
        log.info(servletRequest.getSession().getId());
        if (imageId > 0) {
            return ResponseEntity.ok(imageId);
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("")
    public ResponseEntity<?> getImages(@RequestParam(defaultValue = "") String availableString) {
        if (!availableString.equalsIgnoreCase("")) {
            Boolean available = availableString.equalsIgnoreCase("true");
            return ResponseEntity.status(HttpStatus.OK)
                        .body(imageStorageService.getAllImageWithAvailable(available));
        } else {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(imageStorageService.getAllImage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getImage(@PathVariable Long id) {
        ImageDTO imageDTO = imageStorageService.downloadImage(id);
        return ResponseEntity.status(HttpStatus.OK)
                .body(imageDTO);
    }


}
