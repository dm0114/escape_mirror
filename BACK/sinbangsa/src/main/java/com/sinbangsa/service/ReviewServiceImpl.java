package com.sinbangsa.service;


import com.sinbangsa.data.dto.ReviewDto;
import com.sinbangsa.data.entity.ThemeReview;
import com.sinbangsa.data.repository.ReviewRepository;
import com.sinbangsa.data.repository.ThemeRepository;
import com.sinbangsa.data.repository.UserRepository;
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

    private final UserRepository userRepository;

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
            // 임시 유저정보 token 완료 후 변경 필요
            themeReview.setReviewUser(userRepository.findById(1));

            // 관리자 테마 클리어 승인 후 usedHint, clearTime, clear Date,
            // jwt 토큰 완료 후 reviewUser 넣어야함

        } catch (Exception e) {
            return false;
        }

        return true;
    }

}
