package com.sinbangsa.service;


import com.sinbangsa.data.dto.ReviewDto;
import com.sinbangsa.data.dto.ReviewUpdateDto;
import com.sinbangsa.data.entity.Book;
import com.sinbangsa.data.entity.Theme;
import com.sinbangsa.data.entity.ThemeReview;
import com.sinbangsa.data.entity.User;
import com.sinbangsa.data.repository.*;
import com.sinbangsa.exception.AccessDeniedException;
import com.sinbangsa.exception.ReviewNotFoundException;
import com.sinbangsa.exception.UserNotFoundException;
import com.sinbangsa.utils.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final Logger LOGGER = LoggerFactory.getLogger(ReviewServiceImpl.class);

    private final ReviewRepository reviewRepository;

    private final ThemeRepository themeRepository;

    private final UserRepository userRepository;

    private final BookRepository bookRepository;

    private final ThemeReviewRepository themeReviewRepository;

    private final JwtTokenProvider jwtTokenProvider;

    @Transactional
    public boolean createReview(ReviewDto reviewDto, HttpServletRequest httpServletRequest) {

        try {
            String token = jwtTokenProvider.resolveToken(httpServletRequest);
            Long userId = jwtTokenProvider.getUserId(token);
            User user = userRepository.findById(userId).orElse(null);

            Book bookRepo = bookRepository.findById(reviewDto.getBookId()).orElse(null);
            if (bookRepo == null) {
                throw new NullPointerException("도감 정보가 잘못되었습니다.");
            }
            Theme themeRepo = themeRepository.findById(reviewDto.getThemeId()).orElse(null);
            if (themeRepo == null) {
                throw new NullPointerException("테마 정보가 잘못되었습니다.");
            }
            if (bookRepo.getReview() == true) {
                throw new ReviewNotFoundException("이미 리뷰가 작성된 테마입니다");
            }
            System.out.println(bookRepo.getDoneDate());
            ThemeReview themeReview = ThemeReview.builder()
                    .reviewTheme(themeRepo)
                    .reviewUser(user)
                    .content(reviewDto.getContent())
                    .star(reviewDto.getStar())
                    .diff(reviewDto.getFeelDifficulty())
                    .story(reviewDto.getFeelStory())
                    .interior(reviewDto.getFeelInterrior())
                    .activity(reviewDto.getFeelActivity())
                    .horror(reviewDto.getFeelHorror())
                    .locker(reviewDto.getLocker())
                    .imageUrl(reviewDto.getReviewImg())
                    .usedHint(bookRepo.getUsedHint())
                    .clearTime(bookRepo.getClearTime())
                    .clearDate(bookRepo.getDoneDate())
                    .createAt(LocalDateTime.now())
                    .build();
            themeReviewRepository.save(themeReview);
            LOGGER.info("[themeReview] 저장됨");
            bookRepo.update(true);
            LOGGER.info("[bookRepo] 수정됨");
            return true;

        } catch (Exception e) {
            throw e;
        }

    }

    @Transactional
    public boolean updateReview(long reviewId, ReviewUpdateDto reviewUpdate, HttpServletRequest httpServletRequest){

        String token = jwtTokenProvider.resolveToken(httpServletRequest);
        Long userId = jwtTokenProvider.getUserId(token);
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            throw new UserNotFoundException();
        }

        ThemeReview themeReview = themeReviewRepository.findById(reviewId).orElse(null);
        if (themeReview == null) {
            throw new ReviewNotFoundException();
        }

        if (user.getId() != themeReview.getReviewTheme().getId()) {
            throw new AccessDeniedException();
        }

        try {
            themeReview.update(reviewUpdate.getContent(),
                    reviewUpdate.getStar(),
                    reviewUpdate.getFeelDifficulty(),
                    reviewUpdate.getFeelStory(),
                    reviewUpdate.getFeelInterrior(),
                    reviewUpdate.getFeelActivity(),
                    reviewUpdate.getFeelHorror(),
                    reviewUpdate.getLocker(),
                    reviewUpdate.getReviewImg());
            LOGGER.info("[updateReview] 수정 됨");
            return true;

        }catch (Exception e) {
            throw e;
        }
    }

}
