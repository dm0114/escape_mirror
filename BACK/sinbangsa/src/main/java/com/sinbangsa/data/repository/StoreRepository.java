package com.sinbangsa.data.repository;


import com.sinbangsa.data.entity.Store;
import com.sinbangsa.data.entity.Theme;
import org.springframework.data.domain.PageRequest;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StoreRepository extends JpaRepository<Store, Long> {

    List<Store> findAllByStoreNameOrRegionContaining(String searchWord, PageRequest pageRequest);


    List<Store> findAllByRegion(String region);

    List<Store> findAllByRegionContaining(String region, PageRequest pageRequest);

    Optional<Store> findByStoreId(long storeId);

    Optional<Store> getByStoreId(long storeId);

    @Query("select max(storeId)+1 from Store ")
    Long getNewStoreId();


}
