package com.monopoco.arcade.repository;

import com.monopoco.arcade.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, String> {
    public Optional<Category> findByCategoryName(String categoryName);
}
