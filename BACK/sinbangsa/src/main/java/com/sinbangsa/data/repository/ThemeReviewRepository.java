package com.sinbangsa.data.repository;

import com.sinbangsa.data.entity.Theme;
import com.sinbangsa.data.entity.ThemeReview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ThemeReviewRepository extends JpaRepository<ThemeReview, Long> {

    @Query("select avg(themeReview.star) " +
            "from ThemeReview themeReview " +
            "where themeReview.reviewTheme = :theme")
    Double getAvgStar(@Param("theme") Theme theme);
}
