package com.sinbangsa.data.repository;

import com.sinbangsa.data.entity.Store;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StoreRepository extends JpaRepository<Store, Long> {

    List<Store> findAllByRegion(String region);

    List<Store> findAllByRegionContaining(String region);
}
