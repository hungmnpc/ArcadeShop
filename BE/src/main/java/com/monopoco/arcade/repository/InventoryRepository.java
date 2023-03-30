package com.monopoco.arcade.repository;

import com.monopoco.arcade.entity.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InventoryRepository extends JpaRepository<Inventory, String> {
    public Inventory findInventoryByType(String type);

}
