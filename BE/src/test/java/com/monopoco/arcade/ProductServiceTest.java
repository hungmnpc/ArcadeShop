package com.monopoco.arcade;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Rollback(value = false)
public class ProductServiceTest {

//    @Autowired
//    private ProductService productService;

    @Autowired
    private BrandRepository repo;

    @Test
    void testNewCategory() {
        Brand category = repo.save(new Brand(null, "msi"));
        assertThat(category).isNotNull();
        assertThat(category.getId()).isGreaterThan(0);
    }

}
