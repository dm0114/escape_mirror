package com.sinbangsa.data.repository;


import com.sinbangsa.data.entity.Store;
import com.sinbangsa.data.entity.Theme;
import com.sinbangsa.data.entity.ThemeTime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ThemeRepository extends JpaRepository<Theme, Long> {

    Theme findById(long id);
    List<Theme> findAllByStore(Store store);
    List<Theme> findAllByThemeNameContaining(String searchWord);
    int countByStore(Store store);

}
