package com.monopoco.arcade;

import com.monopoco.arcade.entity.User;
import com.monopoco.arcade.modal.UserDTO;
import com.monopoco.arcade.repository.UserRepository;
import com.monopoco.arcade.service.userservice.UserService;
import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.annotation.Rollback;

import java.util.HashSet;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Rollback(value = false)
public class UserServiceTest {

    @Autowired
    private UserRepository repo;

    @Autowired
    private UserService service;

    @Autowired
    private ModelMapper modelMapper;

    @Test
    public void testAddUser() {
        String password = "12345";
        UserDTO user =  new UserDTO(null, "Hưng", "Đinh", "hungkaiken3@gmail.com", password,"0868462896",null, new HashSet<>());
        UserDTO userSaved = service.addNewUser(user);
        assertThat(userSaved).isNotNull();
        assertThat(userSaved.getId()).isGreaterThan(0);

    }

}
