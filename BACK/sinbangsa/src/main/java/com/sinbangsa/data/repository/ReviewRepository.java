package com.sinbangsa.data.repository;


import com.sinbangsa.data.entity.ThemeReview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepository extends JpaRepository<ThemeReview, Long> {

}

