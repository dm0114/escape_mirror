package com.sinbangsa.data.repository;

import com.sinbangsa.data.entity.Theme;
import com.sinbangsa.data.entity.ThemeReview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ThemeReviewRepository extends JpaRepository<ThemeReview,Long> {
    int countAllByReviewTheme(Theme theme);
    List<ThemeReview> getThemeReviewsByReviewTheme(Theme theme);
    @Query(value = "select avg(themeReview.star) " +
            "from Theme theme join ThemeReview themeReview " +
            "on themeReview.reviewTheme = theme " +
            "where themeReview.reviewTheme = theme")
    double getAvgStar(long themeId);

    @Query(value = "select * from ThemeReview order by RAND() limit 1",nativeQuery = true)
    ThemeReview randomReview(Theme theme);
}
