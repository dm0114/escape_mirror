package com.sinbangsa.data.repository;

import com.sinbangsa.data.entity.Theme;
import com.sinbangsa.data.entity.ThemeReview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ThemeReviewRepository extends JpaRepository<ThemeReview,Long> {
    int countAllByReviewTheme(Theme theme);
    List<ThemeReview> getThemeReviewsByReviewTheme(Theme theme);

    @Query("select avg(themeReview.star) " +
            "from ThemeReview themeReview " +
            "where themeReview.reviewTheme =:theme ")
    Double getAvgStar(@Param("theme") Theme theme);

    @Query(value = "select * from ThemeReview order by RAND() limit 1 where themeReview.reviewTheme = :theme",nativeQuery = true)
    ThemeReview randomReview(@Param("theme") Theme theme);
}
