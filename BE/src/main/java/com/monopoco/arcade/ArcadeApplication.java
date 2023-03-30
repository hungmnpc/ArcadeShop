package com.monopoco.arcade;

import com.monopoco.arcade.entity.Role;
import com.monopoco.arcade.modal.UserDTO;
import com.monopoco.arcade.service.productservice.ProductService;
import com.monopoco.arcade.service.userservice.UserService;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import org.modelmapper.ModelMapper;
import org.modelmapper.config.Configuration;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import java.util.ArrayList;
import java.util.HashSet;

@SpringBootApplication


public class ArcadeApplication {

	public static void main(String[] args) {
		SpringApplication.run(ArcadeApplication.class, args);
	}

	@Bean
	public WebSecurityCustomizer webSecurityCustomizer() {
		return (web) -> web.ignoring().requestMatchers(new AntPathRequestMatcher("/h2-console/**"));
	}
	@Bean
	public ModelMapper modelMapper() {
		ModelMapper modelMapper = new ModelMapper();
		modelMapper.getConfiguration().setFieldMatchingEnabled(true)
			.setFieldAccessLevel(Configuration.AccessLevel.PRIVATE)
			.setMatchingStrategy(MatchingStrategies.STRICT);
		return modelMapper;
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	@Bean
	CommandLineRunner run(UserService userService, ProductService productService) {
		return args -> {
//			userService.addNewRole(new Role(null, "ROLE_USER"));
//			userService.addNewRole(new Role(null, "ROLE_ADMIN"));
//			userService.addNewUser(new UserDTO(null, "Hưng", "Đinh", "hungkaiken4@gmail.com", "12345", "0868462896", "https://i.pinimg.com/236x/d0/a6/05/d0a605488eaeaf09e84f6d7745dd8764.jpg", new HashSet<>()));
//			userService.addNewUser(new UserDTO(null, "Huy", "Nguyễn", "quanghuynb123456789@gmail.com", "12345", "0948278731", "https://i.pinimg.com/564x/ed/a9/f0/eda9f0636b7084611ecb5d4608a5dc2e.jpg", new HashSet<>()));
//
//			userService.addRoleToUser("hungkaiken4@gmail.com", "ROLE_USER");
//			userService.addRoleToUser("quanghuynb123456789@gmail.com", "ROLE_USER");
//			userService.addRoleToUser("quanghuynb123456789@gmail.com", "ROLE_ADMIN");
//			userService.addNewUser(new UserDTO(null, "Huy", "Nguyễn", "test@gmail.com", "12345", "0948278731", "https://i.pinimg.com/564x/ed/a9/f0/eda9f0636b7084611ecb5d4608a5dc2e.jpg", new HashSet<>()));
//			userService.addRoleToUser("test@gmail.com", "ROLE_USER");
//
//			productService.saveCategory("Best Sellers");
//			productService.saveCategory("Accessories");
//			productService.saveCategory("Consoles");
//			productService.saveCategory("Controllers");
//			productService.saveCategory("Games");
//			productService.saveCategory("On Sale");
//			productService.saveCategory("All");
//
//			productService.saveDiscountMode("PERCENT");
//			productService.saveDiscountMode("AMOUNT");
//
//			productService.saveInventory("In stock");
//			productService.saveInventory("Out of stock");
//
//			productService.saveAdditionalInfoTitle("Product Info");
//			productService.saveAdditionalInfoTitle("Return and Refund Policy");
//			productService.saveAdditionalInfoTitle("Shipping Info");
//			productService.saveAdditionalInfoTitle("Empty");

		};
	}
}
