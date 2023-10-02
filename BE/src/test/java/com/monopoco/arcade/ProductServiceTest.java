package com.monopoco.arcade;

import com.monopoco.arcade.entity.Product;
import com.monopoco.arcade.repository.ProductRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;

import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Rollback(value = false)
public class ProductServiceTest {

//    @Autowired
//    private ProductService productService;

    // @Autowired
    // private ProductRepository repo;

    // @Test
    // void testNewCategory() {
    //     List<Product> products = repo.filter("Best Sellers");
    //     assertThat(products.size()).isGreaterThan(0);
    // }

}
