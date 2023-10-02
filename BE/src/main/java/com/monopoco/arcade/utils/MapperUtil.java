package com.monopoco.arcade.utils;

import com.monopoco.arcade.entity.*;
import com.monopoco.arcade.modal.*;
import com.monopoco.arcade.service.imageservice.ImageStorageService;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
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

    public static CartDTO cartMapper(Cart cart, ModelMapper modelMapper, ImageStorageService imageStorageService) {
        UserDTO userDTO = userMapper(cart.getUser(), modelMapper);
        ProductDTO productDTO = productMapper(cart.getProduct(), modelMapper, imageStorageService);
        CartDTO cartDTO = modelMapper.map(cart, CartDTO.class);
        cartDTO.setProduct(productDTO);
        return cartDTO;
    }

    public static UserDTO userMapper(User user, ModelMapper modelMapper) {
        UserDTO userDTO = modelMapper.map(user, UserDTO.class);
        List<String> roles = user.getRoles().stream().map(Role::getName).collect(Collectors.toList());
        userDTO.setRoles(roles);
        return userDTO;
    }

    public static OrderDetailDTO orderDetailMapper(OrderDetail orderDetail,
                                                   ModelMapper modelMapper,
                                                   ImageStorageService imageStorageService) {
        OrderDetailDTO orderDetailDTO = modelMapper.map(orderDetail, OrderDetailDTO.class);
        ProductDTO productDTO = productMapper(orderDetail.getProduct(), modelMapper, imageStorageService);
        orderDetailDTO.setProduct(productDTO);
        return orderDetailDTO;
    }

    public static OrderDTO orderMapper(Order order,
                                       ModelMapper modelMapper,
                                       ImageStorageService imageStorageService) {
        OrderDTO orderDTO = modelMapper.map(order, OrderDTO.class);
        UserDTO userDTO = userMapper(order.getUser(), modelMapper);
        List<OrderDetailDTO> orderDetailDTOS = order.getOrderDetails().stream()
                .map(orderDetail ->
                    orderDetailMapper(orderDetail, modelMapper, imageStorageService)
                ).collect(Collectors.toList());
        orderDTO.setOrderDetails(orderDetailDTOS);
        AtomicReference<Double> subTotal = new AtomicReference<>(new Double(0.0));
        orderDetailDTOS.forEach(orderDetailDTO -> {
            Double subDetail = orderDetailDTO.getQuantity() * orderDetailDTO.getProduct().getPrice() *
                    (100 - orderDetailDTO.getProduct().getDiscountValue()) / 100;
            subTotal.updateAndGet(v -> v + subDetail);
        });
        orderDTO.setSubTotal(subTotal.get());
        orderDTO.setStatusNumber(order.getStatus().getStatus());
        orderDTO.setUser(userDTO);
        orderDTO.setStatusValue(order.getStatus().toString());
        return orderDTO;
    }
}
