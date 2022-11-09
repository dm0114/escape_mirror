package com.sinbangsa.data.repository;


import com.sinbangsa.data.entity.Store;
import com.sinbangsa.data.entity.Theme;
import com.sinbangsa.data.entity.ThemeTime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ThemeRepository extends JpaRepository<Theme, Long> {

    Theme findById(long id);
    Optional<Theme> getById(long themeId);
    List<Theme> findAllByStore(Store store);
    List<Theme> findAllByThemeNameContaining(String searchWord);
    int countByStore(Store store);



}
