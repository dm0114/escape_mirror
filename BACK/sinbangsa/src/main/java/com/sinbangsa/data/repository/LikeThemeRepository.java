package com.sinbangsa.data.repository;

import com.sinbangsa.data.entity.LikeTheme;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LikeThemeRepository extends JpaRepository<LikeTheme, Long> {

}
