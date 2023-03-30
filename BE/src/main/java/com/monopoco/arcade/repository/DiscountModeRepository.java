package com.monopoco.arcade.repository;

import com.monopoco.arcade.entity.DiscountMode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DiscountModeRepository extends JpaRepository<DiscountMode, String> {

    public DiscountMode findByDiscountMode(String discountMode);

}
