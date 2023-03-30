package com.monopoco.arcade.service.userservice;

import com.monopoco.arcade.entity.Role;
import com.monopoco.arcade.entity.User;
import com.monopoco.arcade.modal.UserDTO;
import com.monopoco.arcade.principal.UserPrincipal;
import com.monopoco.arcade.repository.RoleRepository;
import com.monopoco.arcade.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;


@Service
@Transactional
@Slf4j
public class UserServiceImpl implements UserService, UserDetailsService {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private RoleRepository roleRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;


    @Override
    public List<UserDTO> getAllUser() {

        List<User> userList = userRepo.findAll();

        List<UserDTO> data = new ArrayList<>();

        log.info("Fetching all user......");

        userList.forEach(user -> {
            data.add(modelMapper.map(user, UserDTO.class));
        });


        return data;
    }

    @Override
    public UserDTO getUserById(Long id) {
        Optional<User> user = userRepo.findById(id);
        User getUser = null;
        if (user.isPresent()) {
            getUser = user.get();
            return modelMapper.map(getUser, UserDTO.class);
        }
        return null;


    }

    @Override
    public UserDTO getUserByEmail(String email) {
        return null;
    }

    @Override
    public void deleteUserById(Long id) {

    }

    @Override
    public void updateUser(UserDTO user) {

    }

    @Override
    public UserDTO addNewUser(UserDTO userDTO) {
        User user = modelMapper.map(userDTO, User.class);

        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        log.info("Saving a new User: {}", user.getEmail());

        User userSaved = userRepo.save(user);

        return modelMapper.map(userSaved, UserDTO.class);

    }

    @Override
    public void addNewRole(Role role) {

        roleRepo.save(role);
    }

    @Override
    public void addRoleToUser(String email, String roleName) {

        log.info("Adding role {} to user {}", roleName, email);
        User user = userRepo.findUserByEmail(email);
        Role role = roleRepo.findByName(roleName);
        user.getRoles().add(role);
    }

    private boolean isExists(String email) {
        User user = userRepo.findUserByEmail(email);
        return user.getId() != null;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepo.findUserByEmail(email);
        if (user == null) {
            log.error("User not found in the database");
            throw new UsernameNotFoundException("User not found in the database");
        } else {
            log.info("User found in the database: {}", email);
        }

//        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
//        user.getRoles().forEach(role -> {
//            authorities.add(new SimpleGrantedAuthority(role.getName()));
//        });

//        return new UserPrincipal(user.getFirstName()+ user.getLastName(), user.getEmail(), user.getPassword(), authorities);
        return  new UserPrincipal(modelMapper.map(user, UserDTO.class));
    }
}
