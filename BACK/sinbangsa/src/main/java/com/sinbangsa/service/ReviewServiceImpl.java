package com.sinbangsa.service;


import com.sinbangsa.data.dto.ReviewDto;
import com.sinbangsa.data.entity.ThemeReview;
import com.sinbangsa.data.repository.ReviewRepository;
import com.sinbangsa.data.repository.ThemeRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final Logger LOGGER = LoggerFactory.getLogger(ReviewServiceImpl.class);

    private final ReviewRepository reviewRepository;

    private final ThemeRepository themeRepository;

    @Transactional
    public boolean createReview(ReviewDto reviewDto) {

        ThemeReview themeReview = new ThemeReview();

        try {
            themeReview.setReviewTheme(themeRepository.findById(reviewDto.getThemeId()));
            themeReview.setImageUrl(reviewDto.getReviewImg());
            themeReview.setStar(reviewDto.getStar());
            themeReview.setDiff(reviewDto.getFeelDifficulty());
            themeReview.setStory(reviewDto.getFeelStory());
            themeReview.setInterior(reviewDto.getFeelInterrior());
            themeReview.setActivity(reviewDto.getFeelActivity());
            themeReview.setHorror(reviewDto.getFeelHorror());
            themeReview.setLocker(reviewDto.getLocker());
            themeReview.setContent(reviewDto.getContent());
            themeReview.setCreateAt(LocalDate.now());
            // usedHint, clearTime, clear Date,
            // jwt 토큰 완료 후 reviewUser 넣어야함

            reviewRepository.save(themeReview);
        } catch (Exception e) {
            return false;
        }

        return true;
    }

}
