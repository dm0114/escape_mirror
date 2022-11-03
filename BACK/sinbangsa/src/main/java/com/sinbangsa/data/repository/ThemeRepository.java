package com.sinbangsa.data.repository;


import com.sinbangsa.data.entity.Theme;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ThemeRepository extends JpaRepository<Theme, Long> {

    Theme findById(long id);

}
