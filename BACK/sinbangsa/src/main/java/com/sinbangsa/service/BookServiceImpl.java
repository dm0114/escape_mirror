package com.sinbangsa.service;


import com.sinbangsa.data.dto.*;
import com.sinbangsa.data.entity.*;
import com.sinbangsa.data.repository.*;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BookServiceImpl implements BookService {

    private final Logger LOGGER = LoggerFactory.getLogger(BookServiceImpl.class);


    private final BookRepository bookRepository;

    private final StoreRepository storeRepository;

    private final ThemeRepository themeRepository;

    private final UserRepository userRepository;

    private final ThemeReviewRepository themeReviewRepository;

    private final UserThemeRelationRepository userThemeRelationRepository;

    public List<StoreDto> getStoreList(String region) {
        LOGGER.info("[BookService] getCafeList 호출");
        List<StoreDto> cafeList = new ArrayList<>();

        String state;
        String city;
        String[] strList = region.split("/");
        state = strList[0];
        city = strList[1];
        if (city == "전체") {
            region = state;
        }
        List<StoreDto> stores = new ArrayList<>();
        List<Store> storesRepo = storeRepository.findAllByRegionContaining(region);

        // 임시
        long userId = (long) 1;
        User userRepo = userRepository.findById(userId);

        for (Store storeRepo : storesRepo) {
            StoreDto storeDto = new StoreDto();
            storeDto.setStoreId(storeRepo.getStoreId());
            storeDto.setStoreImg(storeRepo.getPoster());
            storeDto.setStoreName(storeRepo.getStoreName());
            storeDto.setClearCnt(bookRepository.getClearCnt(userRepo, storeRepo));
            storeDto.setTotalTheme(themeRepository.countByStore(storeRepo));
            stores.add(storeDto);
        }

        return stores;
    }

    public StoreDetailDto getStoreDetail(long storeId) {
        LOGGER.info("[BookService] getStoreDetail 호출");

        StoreDetailDto storeDetailDto = new StoreDetailDto();

        Store storeRepo = storeRepository.findByStoreId(storeId);
        LOGGER.info("[BookService] storeRepo 불러오기 성공");

        storeDetailDto.setStoreName(storeRepo.getStoreName());
        storeDetailDto.setStoreAddress(storeRepo.getAddress());
        storeDetailDto.setMapX(storeRepo.getMapX());
        storeDetailDto.setMapY(storeRepo.getMapY());
        storeDetailDto.setTel(storeRepo.getTel());
        storeDetailDto.setStoreImg(storeRepo.getPoster());
        storeDetailDto.setHomepage(storeRepo.getHomepage());
        storeDetailDto.setRegion(storeRepo.getRegion());

        // 임시
        long userId = (long) 1;
        User userRepo = userRepository.findById(userId);
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
            Double star = themeReviewRepository.getAvgStar(themeRepo).orElse(null);
            if ( star == null) {
                themeDetailDto.setStar(0);
            } else {
                themeDetailDto.setStar((int) Math.round(themeReviewRepository.getAvgStar(themeRepo).orElse(null)));
            }


            themeDetailDtoList.add(themeDetailDto);

        }
        storeDetailDto.setThemeList(themeDetailDtoList);
        LOGGER.info("[BookService] getStoreDetail 성공");
        return storeDetailDto;
    }

    public List<ThemeForThemeListDto> getThemeList(long storeId) {
        LOGGER.info("[BookService] getThemeList 호출");

        List<ThemeForThemeListDto> themeList = new ArrayList<>();
        Store storeRepo = storeRepository.findByStoreId(storeId);
        List<Theme> themesRepo = themeRepository.findAllByStore(storeRepo);
        // 임시
        User userRepo = userRepository.findById((long) 1);

        try {
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


    public ThemeDetailInfoDto getThemeDetail(long themeId) {
        LOGGER.info("[BookService] getThemeDetail 호출");

        ThemeDetailInfoDto themeDetailInfoDto = new ThemeDetailInfoDto();
        Theme themeRepo = themeRepository.findById(themeId);
        LOGGER.info("[BookService] getThemeDetail themeRepository 성공");
        try {
            themeDetailInfoDto.setThemeName(themeRepo.getThemeName());
            themeDetailInfoDto.setGenre(themeRepo.getGenre());
            themeDetailInfoDto.setCapacity(themeRepo.getCapacity());
            themeDetailInfoDto.setPrice(themeRepo.getPrice());
            themeDetailInfoDto.setDifficulty(themeRepo.getDifficulty());
            themeDetailInfoDto.setLeadTime(themeRepo.getLeadtime());
            themeDetailInfoDto.setDescription(themeRepo.getDescription());
            themeDetailInfoDto.setThemeImg(themeRepo.getPoster());

            Double star = themeReviewRepository.getAvgStar(themeRepo).orElse(null);
            if (star == null) {
                themeDetailInfoDto.setStar(0);
            } else {
                themeDetailInfoDto.setStar((int) Math.round(star));
            }

            Double difficulty = themeReviewRepository.getAvgDifficulty(themeRepo).orElse(null);
            if (difficulty == null) {
                themeDetailInfoDto.setDifficulty(0);
            } else {
                themeDetailInfoDto.setDifficulty((int) Math.round(difficulty));
            }

            Double story = themeReviewRepository.getAvgStory(themeRepo).orElse(null);
            if (story == null) {
                themeDetailInfoDto.setFeelStory(0);
            } else {
                themeDetailInfoDto.setFeelStory((int) Math.round(story));
            }

            Double interior = themeReviewRepository.getAvgInterior(themeRepo).orElse(null);
            if (interior == null) {
                themeDetailInfoDto.setFeelInterior(0);
            } else {
                themeDetailInfoDto.setFeelInterior((int) Math.round(interior));
            }

            Double activity = themeReviewRepository.getAvgActivity(themeRepo).orElse(null);
            if (activity == null) {
                themeDetailInfoDto.setFeelActivity(0);
            } else {
                themeDetailInfoDto.setFeelActivity((int) Math.round(activity));
            }

            Double horror = themeReviewRepository.getAvgHorror(themeRepo).orElse(null);
            if (horror == null) {
                themeDetailInfoDto.setFeelHorror(0);
            } else {
                themeDetailInfoDto.setFeelHorror((int) Math.round(horror));
            }

            Double lock = themeReviewRepository.getAvgLock(themeRepo).orElse(null);
            if (lock == null) {
                themeDetailInfoDto.setLock(0);
            } else {
                themeDetailInfoDto.setLock((int) Math.round(lock));
            }


            List<ReviewThemeDetailInfoDto> reviews = new ArrayList<>();
            List<ThemeReview> themeReviewsRepo = themeReviewRepository.findAllByReviewTheme(themeRepo).orElse(null );
            for (ThemeReview themeReviewRepo : themeReviewsRepo) {
                ReviewThemeDetailInfoDto reviewThemeDetailInfoDto = new ReviewThemeDetailInfoDto();
                reviewThemeDetailInfoDto.setReviewId(themeReviewRepo.getId());
                reviewThemeDetailInfoDto.setUserName(themeReviewRepo.getReviewUser().getUsername());
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
            List<Book> noHintUsersRepo = bookRepository.getAllBook(themeRepo).orElse(null);;
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
            throw new NullPointerException();
        }




    }

    public Boolean themeLike(long themeId) {
        LOGGER.info("[BookService] themeLike 호출");
        Theme themeRepo = themeRepository.findById(themeId);
        UserThemeRelation userThemeRelation = new UserThemeRelation();
        //임시
        User userRepo = userRepository.findById((long) 1);
        if (userThemeRelationRepository.existsByUserRelationThemeAndThemeRelationUser(themeRepo, userRepo)) {

            return false;
        } else {

            userThemeRelation.setUserRelationTheme(themeRepo);
            System.out.println(1);
            userThemeRelation.setThemeRelationUser(userRepo);
            System.out.println(2);
            userThemeRelationRepository.save(userThemeRelation);
            System.out.println(3);
            return true;
        }


    }

    public Boolean themeLikeCancel(long themeId) {
        LOGGER.info("[BookService] themeLike 호출");
        Theme themeRepo = themeRepository.findById(themeId);
        UserThemeRelation userThemeRelation = new UserThemeRelation();
        //임시
        User userRepo = userRepository.findById((long) 1);
        if (userThemeRelationRepository.existsByUserRelationThemeAndThemeRelationUser(themeRepo, userRepo)) {
            userThemeRelationRepository.delete(userThemeRelationRepository.findByUserRelationThemeAndThemeRelationUser(themeRepo, userRepo));
            return true;
        } else {

            return false;
        }


    }



}
