package com.monopoco.arcade.api;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.monopoco.arcade.entity.User;
import com.monopoco.arcade.modal.UserDTO;
import com.monopoco.arcade.principal.UserPrincipal;
import com.monopoco.arcade.service.userservice.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Optional;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;

@RestController
@RequestMapping("/api")
@Slf4j
@SecurityRequirement(name = "Bearer Authentication")
public class UserController {

    @Autowired
    private UserService service;

    @Operation(summary = "Get user", description = "Get user")
    @GetMapping("/users")
    public ResponseEntity<?> getAllUser() {
        return ResponseEntity.ok().body(service.getAllUser());
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<UserDTO> getUser(@PathVariable(name = "id") Long id) {
        log.info("Getting user with id: {}", id);
        UserDTO userDTO = service.getUserById(id);
        if (userDTO == null) {
            log.info("Not found user with id {} in the database", id);
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.status(HttpStatus.FOUND).body(userDTO);
        }
    }

    @GetMapping("/users/avatar")
    public ResponseEntity<String> getAvatar(HttpServletRequest request) {
        String authorizationHeader = request.getHeader(AUTHORIZATION);
        String token = authorizationHeader.substring("Bearer ".length());
        Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
        JWTVerifier verifier = JWT.require(algorithm).build();
        DecodedJWT decodedJWT = verifier.verify(token);
        String avatarUrl = decodedJWT.getClaim("avatarUrl").asString();
        return ResponseEntity.ok().body(avatarUrl);
    }


}
