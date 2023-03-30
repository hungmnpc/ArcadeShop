package com.monopoco.arcade.service.userservice;

import com.monopoco.arcade.entity.Role;
import com.monopoco.arcade.modal.UserDTO;

import java.util.List;

public interface UserService {

    List<UserDTO> getAllUser();

    UserDTO getUserById(Long id);

    UserDTO getUserByEmail(String email);

    void deleteUserById(Long id);

    void updateUser(UserDTO user);

    UserDTO addNewUser(UserDTO userDTO);

    void addNewRole(Role role);

    void addRoleToUser(String email, String roleName);



}
