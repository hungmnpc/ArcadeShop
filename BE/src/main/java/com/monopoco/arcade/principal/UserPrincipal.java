package com.monopoco.arcade.principal;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.monopoco.arcade.modal.UserDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;

@Slf4j
public class UserPrincipal implements UserDetails {

    private UserDTO userDTO;

    public UserPrincipal(UserDTO userDTO) {
        this.userDTO = userDTO;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        log.info("{}", userDTO.getRoles());
        userDTO.getRoles().forEach(role -> {
            log.info(role);
            authorities.add(new SimpleGrantedAuthority(role.toString()));
        });
        log.info("{}", authorities.toString());
        return authorities;
    }

    @Override
    public String getPassword() {
        return userDTO.getPassword();
    }

    public String getName() {
        return userDTO.getFirstName() + " " + userDTO.getLastName();
    }

    public String getAvatarUrl() {
        return userDTO.getAvatarUrl();
    }

    @Override
    public String getUsername() {
        return userDTO.getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public Long getId() {
        return userDTO.getId();
    }

    public String getEmail() {
        return userDTO.getEmail();
    }

    public UserDTO getUser() {
        return userDTO;
    }
}
