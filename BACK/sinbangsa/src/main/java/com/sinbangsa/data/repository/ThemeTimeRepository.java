package com.sinbangsa.data.repository;

import com.sinbangsa.data.dto.ThemeTimeDto;
import com.sinbangsa.data.entity.ThemeTime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ThemeTimeRepository extends JpaRepository<ThemeTime, Long> {

    ThemeTime findById(long id);

    List<ThemeTime> findAllByThemeId(long themeId);

    @Query(value = "select ifnull(max(t.id),0) from theme_time t where t.id > :themeId * 100",nativeQuery = true)
    Long getNewId(@Param("themeId") long themeId);


}
