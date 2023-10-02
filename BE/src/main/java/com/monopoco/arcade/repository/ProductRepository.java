package com.monopoco.arcade.repository;

import com.fasterxml.jackson.annotation.JsonView;
import com.monopoco.arcade.entity.Category;
import com.monopoco.arcade.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    public Product findByName(String name);

    public Page<Product> findProductsByCategoriesContaining(Pageable pageable, Category category);

    public List<Product> findProductsByCategoriesNotContains(Category category);

    @Query("select p from Product  p join p.categories c where c.categoryName = :name")
    public List<Product> filter(@Param("name") String name);

    @Query(value = "select * from bestSeller", nativeQuery = true)
    public List<Product> bestSeller();

    @Query(value = "select * from upgradeGear", nativeQuery = true)
    public List<Product> upgradeGear();

    @Query(value = "select * from bestGame", nativeQuery = true)
    public List<Product> bestGame();

    @Query(value = "CALL filterProduct(:priceMin, :priceMax, :categoryId, :columnSort, :sortType, :mainCategory);", nativeQuery = true)
    public List<Product> filterProducts(@Param("priceMin") Integer priceMin,
                                        @Param("priceMax") Integer priceMax,
                                        @Param("categoryId") String categoryId,
                                        @Param("columnSort") String columnSort,
                                        @Param("sortType") String sortType,
                                        @Param("mainCategory") String mainCategory);
}
