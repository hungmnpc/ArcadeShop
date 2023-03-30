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
        Set<ImageDTO> images = new HashSet<>();

        product.getImages().forEach(image -> {
            ImageDTO imageDTO = imageStorageService.downloadImage(image.getId());
            images.add(imageDTO);
        });
        productDTO.setImageSet(images);
        Set<String> categories = new HashSet<>();
        product.getCategories().forEach(category -> {
            categories.add(category.getCategoryName());
        });

        productDTO.setCategoriesName(categories);
        return productDTO;
    }

    public static ImageDTO imageMapper(Image image, ModelMapper modelMapper) {
        byte[] images = ImageUtils.decompressImage(image.getImageData());
        String imageBase64 = Base64.getEncoder().encodeToString(images);
        return new ImageDTO(image.getId(), imageBase64, image.getName());
    }

    public static CategoryDTO categoryMapper(Category category, ModelMapper modelMapper, ImageStorageService imageStorageService) {
        CategoryDTO categoryDTO = new CategoryDTO();
        categoryDTO.setCategoryName(category.getCategoryName());
        if (category.getImage() != null) {
            categoryDTO.setImageDTO(imageMapper(category.getImage(), modelMapper));
        }
        categoryDTO.setId(category.getId());
        categoryDTO.setProducts(category.getProducts().stream().map(product ->
            productMapper(product, modelMapper, imageStorageService)
        ).collect(Collectors.toSet()));
        return categoryDTO;
    }
}
