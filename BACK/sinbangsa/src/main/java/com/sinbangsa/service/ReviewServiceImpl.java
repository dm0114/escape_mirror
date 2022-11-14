package com.sinbangsa.service;


import com.sinbangsa.data.dto.ReviewDto;
import com.sinbangsa.data.entity.Book;
import com.sinbangsa.data.entity.Theme;
import com.sinbangsa.data.entity.ThemeReview;
import com.sinbangsa.data.entity.User;
import com.sinbangsa.data.repository.*;
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
                    .build();
            themeReviewRepository.save(themeReview);
            return true;

        } catch (Exception e) {
            throw e;
        }

    }

}
