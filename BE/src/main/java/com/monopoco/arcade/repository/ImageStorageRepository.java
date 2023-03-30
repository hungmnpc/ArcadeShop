package com.monopoco.arcade.repository;

import com.monopoco.arcade.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
public interface ImageStorageRepository extends JpaRepository<Image, Long> {
    Optional<Image> findByName(String imageName);

    List<Image> findImagesByIdIn(List<Long> ids);

    List<Image> findImagesByProductIsNull();

    List<Image> findImagesByProductIsNotNull();

}
