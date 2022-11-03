package com.sinbangsa.data.repository;

import com.sinbangsa.data.entity.ThemeTime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ThemeTimeRepository extends JpaRepository<ThemeTime, Long> {

    ThemeTime findById(long id);

}
