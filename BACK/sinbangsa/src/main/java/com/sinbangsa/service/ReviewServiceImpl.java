package com.sinbangsa.service;


import com.sinbangsa.data.dto.ReviewDto;
import com.sinbangsa.data.entity.Book;
import com.sinbangsa.data.entity.ThemeReview;
import com.sinbangsa.data.repository.BookRepository;
import com.sinbangsa.data.repository.ReviewRepository;
import com.sinbangsa.data.repository.ThemeRepository;
import com.sinbangsa.data.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    @Transactional
    public boolean createReview(ReviewDto reviewDto) {

        ThemeReview themeReview = new ThemeReview();

        try {
            Book bookRepo = bookRepository.findById(reviewDto.getBookId());
            ThemeReview.builder()
                    .reviewTheme(themeRepository.findById(reviewDto.getThemeId()))
                    .reviewUser(userRepository.findById(1)) // 유저 정보 변경 필요
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


            // 관리자 테마 클리어 승인 후 usedHint, clearTime, clear Date,
            // jwt 토큰 완료 후 reviewUser 넣어야함

        } catch (Exception e) {
            return false;
        }

        return true;
    }

}
