package com.monopoco.arcade.util;

import com.monopoco.arcade.entity.Product;
import com.monopoco.arcade.modal.ProductDTO;
import com.monopoco.arcade.service.imageservice.ImageStorageService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class MapperUtil {



    public static ProductDTO productMapper(Product product, ModelMapper modelMapper, ImageStorageService imageStorageService) {
        ProductDTO productDTO = modelMapper.map(product, ProductDTO.class);
        productDTO.setDiscountModeName(product.getDiscountMode().getDiscountMode());
        productDTO.setInventoryStatus(product.getInventory().getType());
        Map<String, String> additionalInfo = new HashMap<>();
        additionalInfo.put(product.getAdditionalInfoTitle1().getTitle(), product.getAdditionalInfoDescription1());
        additionalInfo.put(product.getAdditionalInfoTitle2().getTitle(), product.getAdditionalInfoDescription2());
        additionalInfo.put(product.getAdditionalInfoTitle3().getTitle(), product.getAdditionalInfoDescription3());
        productDTO.setAdditionalInfo(additionalInfo);
        Set<String> images = new HashSet<>();
        product.getImages().forEach(image -> {
            byte[] imageData = imageStorageService.downloadImage(image.getId());
            images.add(Base64.getEncoder().encodeToString(imageData));
        });
        productDTO.setImageSet(images);
        Set<String> categories = new HashSet<>();
        product.getCategories().forEach(category -> {
            categories.add(category.getCategoryName());
        });

        productDTO.setCategoriesName(categories);
        return productDTO;
    }

}
