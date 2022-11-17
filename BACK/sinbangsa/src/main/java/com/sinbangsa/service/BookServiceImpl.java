package com.sinbangsa.service;


import com.sinbangsa.data.dto.*;
import com.sinbangsa.data.entity.*;
import com.sinbangsa.data.repository.*;
import com.sinbangsa.utils.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BookServiceImpl implements BookService {

    private final Logger LOGGER = LoggerFactory.getLogger(BookServiceImpl.class);

    private static final String TOTAL = "전체";
    private final BookRepository bookRepository;

    private final StoreRepository storeRepository;

    private final ThemeRepository themeRepository;

    private final UserRepository userRepository;

    private final ThemeReviewRepository themeReviewRepository;

    private final UserThemeRelationRepository userThemeRelationRepository;

    private final JwtTokenProvider jwtTokenProvider;

    public List<StoreDto> getStoreList(String region, int page, HttpServletRequest httpServletRequest) {
        LOGGER.info("[BookService] getCafeList 호출");

        String state;
        String city;
        String[] strList = region.split("/");
        state = strList[0];
        city = strList[1];
        if (city == TOTAL) {
            region = state;
        }
        List<StoreDto> stores = new ArrayList<>();
        try {
            LOGGER.info("유저 정보 호출");
            String token = jwtTokenProvider.resolveToken(httpServletRequest);
            Long userId = jwtTokenProvider.getUserId(token);
            User userRepo = userRepository.findById(userId).orElse(null);

            if (userRepo == null) {
                throw new NullPointerException("유저 정보가 존재하지 않습니다.");
            }
            LOGGER.info("유저정보 호출 성공");

            PageRequest pageRequest = PageRequest.of(page, 6);

            List<Store> storesRepo = storeRepository.findAllByRegionContaining(region, pageRequest);
            for (Store storeRepo : storesRepo) {
                StoreDto storeDto = new StoreDto();
                storeDto.setStoreId(storeRepo.getStoreId());
                storeDto.setStoreImg(storeRepo.getPoster());
                storeDto.setStoreName(storeRepo.getStoreName());
                storeDto.setClearCnt(bookRepository.getClearCnt(userRepo, storeRepo));
                storeDto.setTotalTheme(themeRepository.countByStore(storeRepo));
                storeDto.setStoreCount(storeRepository.countStoreByRegionContaining(region));
                stores.add(storeDto);
            }
            return stores;
        } catch (Exception e) {
            throw e;
        }
    }

    public StoreDetailDto getStoreDetail(long storeId, HttpServletRequest httpServletRequest) {
        LOGGER.info("[BookService] getStoreDetail 호출");

        StoreDetailDto storeDetailDto = new StoreDetailDto();
        try {
            Store storeRepo = storeRepository.findByStoreId(storeId).orElse(null);
            if (storeRepo == null) {
                throw new NullPointerException("카페 정보가 잘못되었습니다.");
            }
            LOGGER.info("[BookService] storeRepo 불러오기 성공");

            storeDetailDto.setStoreName(storeRepo.getStoreName());
            storeDetailDto.setStoreAddress(storeRepo.getAddress());
            storeDetailDto.setMapX(storeRepo.getMapX());
            storeDetailDto.setMapY(storeRepo.getMapY());
            storeDetailDto.setTel(storeRepo.getTel());
            storeDetailDto.setStoreImg(storeRepo.getPoster());
            storeDetailDto.setHomepage(storeRepo.getHomepage());
            storeDetailDto.setRegion(storeRepo.getRegion());

            String token = jwtTokenProvider.resolveToken(httpServletRequest);
            Long userId = jwtTokenProvider.getUserId(token);
            User userRepo = userRepository.findById(userId).orElse(null);
            if (userRepo == null) {
                throw new NullPointerException("유저 정보가 잘못되었습니다.");
            }
            storeDetailDto.setClearCnt(bookRepository.getClearCnt(userRepo, storeRepo));
            storeDetailDto.setTotalTheme(themeRepository.countByStore(storeRepo));

            List<ThemeDetailDto> themeDetailDtoList = new ArrayList<>();
            List<Theme> themesRepo = themeRepository.findAllByStore(storeRepo);
            for (Theme themeRepo : themesRepo) {
                ThemeDetailDto themeDetailDto = new ThemeDetailDto();
                themeDetailDto.setThemeId(themeRepo.getId());
                themeDetailDto.setThemeName(themeRepo.getThemeName());
                themeDetailDto.setStoreName(themeRepo.getStore().getStoreName());
                themeDetailDto.setThemeImg(themeRepo.getPoster());
                themeDetailDto.setLikeCount(themeRepo.getLikeThemes().size());
                Double star = themeReviewRepository.getAvgStar(themeRepo).orElse((double) 0);
                themeDetailDto.setStar((int) Math.round(star));
                themeDetailDtoList.add(themeDetailDto);

            }
            storeDetailDto.setThemeList(themeDetailDtoList);
            LOGGER.info("[BookService] getStoreDetail 성공");
            return storeDetailDto;
        } catch (Exception e) {
            throw e;
        }
    }

    public List<ThemeForThemeListDto> getThemeList(long storeId, HttpServletRequest httpServletRequest) {
        LOGGER.info("[BookService] getThemeList 호출");

        List<ThemeForThemeListDto> themeList = new ArrayList<>();

        try {
            Store storeRepo = storeRepository.findByStoreId(storeId).orElse(null);
            if (storeRepo == null) {
                throw new NullPointerException("카페 정보가 잘못되었습니다.");
            }
            String token = jwtTokenProvider.resolveToken(httpServletRequest);
            Long userId = jwtTokenProvider.getUserId(token);
            User userRepo = userRepository.findById(userId).orElse(null);
            if (userRepo == null) {
                throw new NullPointerException("유저 정보가 잘못되었습니다.");
            }

            List<Theme> themesRepo = themeRepository.findAllByStore(storeRepo);
            for (Theme themeRepo : themesRepo) {
                ThemeForThemeListDto theme = new ThemeForThemeListDto();
                theme.setThemeId(themeRepo.getId());
                theme.setThemeImg(themeRepo.getPoster());
                theme.setThemeName(themeRepo.getThemeName());
                Book bookRepo = bookRepository.findByBookThemeAndBookUser(themeRepo, userRepo).orElse(null);
                if (bookRepo == null) {
                    theme.setIsClear(0);
                } else {
                    theme.setIsClear(bookRepo.getClear());
                }
                themeList.add(theme);
            }
            LOGGER.info("[BookService] getThemeList 성공");
            return themeList;
        } catch (Exception e) {
            throw e;
        }
    }


    public ThemeDetailInfoDto getThemeDetail(long themeId, int page) {
        LOGGER.info("[BookService] getThemeDetail 호출");
        ThemeDetailInfoDto themeDetailInfoDto = new ThemeDetailInfoDto();

        try {
            Theme themeRepo = themeRepository.findById(themeId).orElse(null);
            if (themeRepo == null) {
                throw new NullPointerException("테마 정보가 잘못되었습니다.");
            }
            themeDetailInfoDto.setThemeName(themeRepo.getThemeName());
            themeDetailInfoDto.setGenre(themeRepo.getGenre());
            themeDetailInfoDto.setCapacity(themeRepo.getCapacity());
            themeDetailInfoDto.setPrice(themeRepo.getPrice());
            themeDetailInfoDto.setDifficulty(themeRepo.getDifficulty());
            themeDetailInfoDto.setLeadTime(themeRepo.getLeadtime());
            themeDetailInfoDto.setDescription(themeRepo.getDescription());
            themeDetailInfoDto.setThemeImg(themeRepo.getPoster());

            Double star = themeReviewRepository.getAvgStar(themeRepo).orElse((double) 0);
            themeDetailInfoDto.setStar((int) Math.round(star));

            Double difficulty = themeReviewRepository.getAvgDifficulty(themeRepo).orElse((double) 0);
            themeDetailInfoDto.setDifficulty((int) Math.round(difficulty));

            Double story = themeReviewRepository.getAvgStory(themeRepo).orElse((double) 0);
            themeDetailInfoDto.setFeelStory((int) Math.round(story));

            Double interior = themeReviewRepository.getAvgInterior(themeRepo).orElse((double) 0);
            themeDetailInfoDto.setFeelInterior((int) Math.round(interior));

            Double activity = themeReviewRepository.getAvgActivity(themeRepo).orElse((double) 0);
            themeDetailInfoDto.setFeelActivity((int) Math.round(activity));

            Double horror = themeReviewRepository.getAvgHorror(themeRepo).orElse((double) 0);
            themeDetailInfoDto.setFeelHorror((int) Math.round(horror));

            Double lock = themeReviewRepository.getAvgLock(themeRepo).orElse((double) 0);
            themeDetailInfoDto.setLock((int) Math.round(lock));

            PageRequest pageRequest = PageRequest.of(page, 5);

            List<ReviewThemeDetailInfoDto> reviews = new ArrayList<>();
            List<ThemeReview> themeReviewsRepo = themeReviewRepository.findAllByReviewTheme(themeRepo, pageRequest);
            for (ThemeReview themeReviewRepo : themeReviewsRepo) {
                ReviewThemeDetailInfoDto reviewThemeDetailInfoDto = new ReviewThemeDetailInfoDto();
                reviewThemeDetailInfoDto.setReviewId(themeReviewRepo.getId());
                reviewThemeDetailInfoDto.setContent(themeReviewRepo.getContent());
                reviewThemeDetailInfoDto.setStar(themeReviewRepo.getStar());
                reviewThemeDetailInfoDto.setReviewImg(themeReviewRepo.getImageUrl());
                reviewThemeDetailInfoDto.setCreatedAt(themeReviewRepo.getCreateAt());
                reviewThemeDetailInfoDto.setClearDate(themeReviewRepo.getClearDate());
                reviewThemeDetailInfoDto.setUsedHint(themeReviewRepo.getUsedHint());
                reviewThemeDetailInfoDto.setClearTime(themeReviewRepo.getClearTime());
                reviews.add(reviewThemeDetailInfoDto);
            }
            themeDetailInfoDto.setReviews(reviews);
            LOGGER.info("[BookService] getThemeDetail themeDetailInfoDto 성공");

            List<UserOfRankDto> noHints = new ArrayList<>();
            List<UserOfRankDto> hints = new ArrayList<>();
            List<Book> noHintUsersRepo = bookRepository.getAllBook(themeRepo);
            for (Book noHintUserRepo : noHintUsersRepo) {
                UserOfRankDto userOfRankDto = new UserOfRankDto();
                userOfRankDto.setUserNickname(noHintUserRepo.getBookUser().getNickname());
                userOfRankDto.setClearTime(noHintUserRepo.getClearTime());
                int usedHint = noHintUserRepo.getUsedHint();
                userOfRankDto.setUsedHint(usedHint);
                if (usedHint == 0) {
                    noHints.add(userOfRankDto);
                } else {
                    hints.add(userOfRankDto);
                }
            }
            themeDetailInfoDto.setNoHintRanking(noHints);
            themeDetailInfoDto.setHintRanking(hints);
            return themeDetailInfoDto;
        } catch (Exception e) {
            throw e;
        }
    }

    public Boolean themeLike(long themeId, HttpServletRequest httpServletRequest) {
        LOGGER.info("[BookService] themeLike 호출");

        try {
            Theme themeRepo = themeRepository.findById(themeId).orElse(null);
            if (themeRepo == null) {
                throw new NullPointerException("테마 정보가 잘못되었습니다.");
            }
            String token = jwtTokenProvider.resolveToken(httpServletRequest);
            Long userId = jwtTokenProvider.getUserId(token);
            User userRepo = userRepository.findById(userId).orElse(null);
            if (userRepo == null) {
                throw new NullPointerException("유저 정보가 잘못되었습니다.");
            }
            if (userThemeRelationRepository.existsByUserRelationThemeAndThemeRelationUser(themeRepo, userRepo)) {
                return false;
            } else {
                UserThemeRelation userThemeRelation = UserThemeRelation.builder()
                        .themeRelationUser(userRepo)
                        .userRelationTheme(themeRepo)
                        .build();
                userThemeRelationRepository.save(userThemeRelation);
                return true;
            }
        } catch (Exception e) {
            throw e;
        }
    }

    public Boolean themeLikeCancel(long themeId, HttpServletRequest httpServletRequest) {
        LOGGER.info("[BookService] themeLike 호출");
        try {
            Theme themeRepo = themeRepository.findById(themeId).orElse(null);
            if (themeRepo == null) {
                throw new NullPointerException("테마 정보가 잘못되었습니다.");
            }
            String token = jwtTokenProvider.resolveToken(httpServletRequest);
            Long userId = jwtTokenProvider.getUserId(token);
            User userRepo = userRepository.findById(userId).orElse(null);
            if (userRepo == null) {
                throw new NullPointerException("유저 정보가 잘못되었습니다.");
            }
            if (userThemeRelationRepository.existsByUserRelationThemeAndThemeRelationUser(themeRepo, userRepo)) {
                userThemeRelationRepository.delete(userThemeRelationRepository.findByUserRelationThemeAndThemeRelationUser(themeRepo, userRepo));
                return true;
            } else {

                return false;
            }
        } catch (Exception e) {
            throw e;
        }
    }
}
