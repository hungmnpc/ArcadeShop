package com.monopoco.arcade.utils;

import com.monopoco.arcade.entity.Category;
import com.monopoco.arcade.entity.Image;
import com.monopoco.arcade.entity.Product;
import com.monopoco.arcade.modal.CategoryDTO;
import com.monopoco.arcade.modal.ImageDTO;
import com.monopoco.arcade.modal.ProductDTO;
import com.monopoco.arcade.service.imageservice.ImageStorageService;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.concurrent.atomic.AtomicReference;
import java.util.stream.Collectors;

@Component
@Slf4j
public class MapperUtil {


    public static ProductDTO productMapper(Product product,
                                           ModelMapper modelMapper, ImageStorageService imageStorageService) {
        ProductDTO productDTO = modelMapper.map(product, ProductDTO.class);
        productDTO.setDiscountModeName(product.getDiscountMode().getDiscountMode());
        productDTO.setInventoryStatus(product.getInventory().getType());
        Map<String, String> additionalInfo = new HashMap<>();
        additionalInfo.put(product.getAdditionalInfoTitle1().getTitle(), product.getAdditionalInfoDescription1());
        additionalInfo.put(product.getAdditionalInfoTitle2().getTitle(), product.getAdditionalInfoDescription2());
        additionalInfo.put(product.getAdditionalInfoTitle3().getTitle(), product.getAdditionalInfoDescription3());
        productDTO.setAdditionalInfo(additionalInfo);
        List<ImageDTO> images = product.getImages().stream()
                        .map(image -> imageStorageService.downloadImage(image.getId()))
                                .collect(Collectors.toList());

        if (product.getMainImage() != null ) {
            ImageDTO mainImage = imageStorageService.downloadImage(product.getMainImage().getId());
            images = images.stream().filter(
                    imageDTO -> !Objects.equals(imageDTO.getId(), mainImage.getId())
            ).collect(Collectors.toList());
            images.add(0, mainImage);
        }

        productDTO.setImageSet(images);

        Set<String> categories = new HashSet<>();
        product.getCategories().forEach(category -> {
            categories.add(category.getCategoryName());
        });

        productDTO.setCategoriesName(categories);
        return productDTO;
    }

    public static ImageDTO imageMapper(Image image, ModelMapper modelMapper) {

//        log.info("{}{}", image.getName() ,image.getId());

        byte[] images = ImageUtils.decompressImage(image.getImageData());
        String imageBase64 = Base64.getEncoder().encodeToString(images);
        return new ImageDTO(image.getId(), imageBase64, image.getName());
    }

    public static CategoryDTO categoryMapper(Category category, ModelMapper modelMapper, ImageStorageService imageStorageService) {
        CategoryDTO categoryDTO = new CategoryDTO();
        categoryDTO.setCategoryName(category.getCategoryName());
        if (category.getImage() != null) {
            categoryDTO.setImage(imageMapper(category.getImage(), modelMapper));
        }
        categoryDTO.setId(category.getId());
        categoryDTO.setProducts(category.getProducts().stream().map(product ->
            productMapper(product, modelMapper, imageStorageService)
        ).collect(Collectors.toSet()));
        return categoryDTO;
    }
}
