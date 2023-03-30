package com.monopoco.arcade.repository;

import com.monopoco.arcade.entity.AdditionalInfoTitle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdditionalInfoTitleRepository extends JpaRepository<AdditionalInfoTitle, String> {

    public AdditionalInfoTitle findAdditionalInfoTitleByTitle(String title);
}
