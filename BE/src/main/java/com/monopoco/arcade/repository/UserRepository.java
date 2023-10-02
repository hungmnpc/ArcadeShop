package com.monopoco.arcade.repository;

import com.monopoco.arcade.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findUserByEmail(String email);

    @Query("select u.id from User u where u.email = :email")
    List<Long> getIdByEmail(@Param("email") String email);
}
