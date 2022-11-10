package com.sinbangsa.data.repository;

import com.sinbangsa.data.entity.Theme;
import com.sinbangsa.data.entity.ThemeReview;
import com.sinbangsa.data.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ThemeReviewRepository extends JpaRepository<ThemeReview,Long> {
    int countAllByReviewTheme(Theme theme);
    List<ThemeReview> getThemeReviewsByReviewTheme(Theme theme);

    @Query("select avg(themeReview.star) " +
            "from ThemeReview themeReview " +
            "where themeReview.reviewTheme =:theme ")
    Optional<Double> getAvgStar(@Param("theme") Theme theme);

    @Query(value = "select * from ThemeReview order by RAND() limit 1 where themeReview.reviewTheme = :theme",nativeQuery = true)
    ThemeReview randomReview(@Param("theme") Theme theme);

    @Query(value = "select avg(themeReview.diff) " +
            "from ThemeReview themeReview " +
            "where themeReview.reviewTheme =:theme")
    Optional<Double> getAvgDifficulty(@Param("theme") Theme theme);

    @Query(value = "select avg(themeReview.story) " +
            "from ThemeReview themeReview " +
            "where themeReview.reviewTheme =:theme")
    Optional<Double> getAvgStory(@Param("theme") Theme theme);

    @Query(value = "select avg(themeReview.interior) " +
            "from ThemeReview themeReview " +
            "where themeReview.reviewTheme =:theme")
    Optional<Double> getAvgInterior(@Param("theme") Theme theme);

    @Query(value = "select avg(themeReview.activity) " +
            "from ThemeReview themeReview " +
            "where themeReview.reviewTheme =:theme")
    Optional<Double> getAvgActivity(@Param("theme") Theme theme);

    @Query(value = "select avg(themeReview.horror) " +
            "from ThemeReview themeReview " +
            "where themeReview.reviewTheme =:theme")
    Optional<Double> getAvgHorror(@Param("theme") Theme theme);

    @Query(value = "select avg(themeReview.locker) " +
            "from ThemeReview themeReview " +
            "where themeReview.reviewTheme =:theme")
    Optional<Double> getAvgLock(@Param("theme") Theme theme);

    Optional<List<ThemeReview>> findAllByReviewTheme(Theme theme);

    Optional<List<ThemeReview>> findAllByReviewUser(User user);


}
