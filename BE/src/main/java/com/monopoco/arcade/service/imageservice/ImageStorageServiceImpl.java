package com.monopoco.arcade.service.imageservice;

import com.monopoco.arcade.entity.Image;
import com.monopoco.arcade.repository.ImageStorageRepository;
import com.monopoco.arcade.utils.ImageUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import javax.transaction.Transactional;
import java.io.IOException;
import java.util.Optional;


@Service
@Transactional
public class ImageStorageServiceImpl implements  ImageStorageService{
    @Autowired
    private ImageStorageRepository repository;

    @Override
    public Long uploadImage(MultipartFile file) throws IOException {
        Image imageData = repository.save(Image.builder()
                .name(file.getOriginalFilename())
                .type(file.getContentType())
                .imageData(ImageUtils.compressImage(file.getBytes())).build());



        return imageData.getId();

    }

    @Override
    public byte[] downloadImage(Long id) {
        Optional<Image> dbImageData = repository.findById(id);
        if(dbImageData.isPresent()) {
            byte[] images = ImageUtils.decompressImage(dbImageData.get().getImageData());
            return images;
        }
        return null;
    }
}
