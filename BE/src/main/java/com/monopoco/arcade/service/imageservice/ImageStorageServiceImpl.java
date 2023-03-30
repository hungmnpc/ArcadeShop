package com.monopoco.arcade.service.imageservice;

import com.monopoco.arcade.entity.Image;
import com.monopoco.arcade.modal.ImageDTO;
import com.monopoco.arcade.repository.ImageStorageRepository;
import com.monopoco.arcade.utils.ImageUtils;
import com.monopoco.arcade.utils.MapperUtil;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import javax.transaction.Transactional;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
@Transactional
public class ImageStorageServiceImpl implements  ImageStorageService{
    @Autowired
    private ImageStorageRepository repository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public Long uploadImage(MultipartFile file) throws IOException {
        Image imageData = repository.save(Image.builder()
                .name(file.getOriginalFilename())
                .type(file.getContentType())
                .imageData(ImageUtils.compressImage(file.getBytes())).build());



        return imageData.getId();

    }

    @Override
    public ImageDTO downloadImage(Long id) {
        Optional<Image> dbImageData = repository.findById(id);
        return dbImageData.map(image -> MapperUtil.imageMapper(image, modelMapper)).orElse(null);
    }

    @Override
    public List<ImageDTO> getAllImage() {
        List<Image> images = repository.findAll();
        List<ImageDTO> imageDTOS = new ArrayList<>();
        images.forEach(image -> {
            imageDTOS.add(MapperUtil.imageMapper(image, modelMapper));
        });

        return imageDTOS;
    }

    /**
     *
     * @param idList
     * @return
     */
    @Override
    public List<ImageDTO> getImageByIdList(List<Long> idList) {
        List<Image> imageList = repository.findImagesByIdIn(idList);
        List<ImageDTO> imageDTOS = new ArrayList<>();
        imageList.forEach(image -> {
            imageDTOS.add(MapperUtil.imageMapper(image, modelMapper));
        });

        return imageDTOS;
    }

    /**
     *
     * @param available
     * @return
     */
    @Override
    public List<ImageDTO> getAllImageWithAvailable(Boolean available) {
        List<Image> imageList;
        List<ImageDTO> imageDTOS = new ArrayList<>();
        if (available) {
            imageList = repository.findImagesByProductIsNull();
        } else {
            imageList = repository.findImagesByProductIsNotNull();
        }
        imageList.forEach(image -> {
            imageDTOS.add(MapperUtil.imageMapper(image, modelMapper));
        });
        return imageDTOS;
    }
}
