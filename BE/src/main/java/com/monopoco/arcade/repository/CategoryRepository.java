package com.monopoco.arcade.repository;

import com.monopoco.arcade.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, String> {
    public Category findByCategoryName(String categoryName);
}
