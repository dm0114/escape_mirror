package com.sinbangsa.data.repository;

import com.sinbangsa.data.dto.ThemeTimeDto;
import com.sinbangsa.data.entity.ThemeTime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ThemeTimeRepository extends JpaRepository<ThemeTime, Long> {

    ThemeTime findById(long id);

    List<ThemeTime> findAllByThemeId(long themeId);


}
