package com.monopoco.arcade.modal;

import com.monopoco.arcade.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {

	private Long id;

	private String firstName;

	private String lastName;

	private String email;

	private String password;

	private String phone;

	private String avatarUrl;

	Set<Role> roles;

}
