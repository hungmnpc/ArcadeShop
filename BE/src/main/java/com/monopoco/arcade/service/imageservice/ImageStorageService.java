package com.monopoco.arcade.service.imageservice;

import com.monopoco.arcade.modal.ImageDTO;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public interface ImageStorageService {

    public Long uploadImage(MultipartFile file) throws IOException;

    public ImageDTO downloadImage(Long id);

    public List<ImageDTO> getAllImage();

    public List<ImageDTO> getAllImageWithAvailable(Boolean available);

    public List<ImageDTO> getImageByIdList(List<Long> idList);


}
