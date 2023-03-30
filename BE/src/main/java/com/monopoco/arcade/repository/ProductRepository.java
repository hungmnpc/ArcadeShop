package com.monopoco.arcade.repository;

import com.monopoco.arcade.entity.Category;
import com.monopoco.arcade.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    public Product findByName(String name);

    public Page<Product> findProductsByCategoriesContaining(Pageable pageable, Category category);

}
