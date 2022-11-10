package com.sinbangsa.service;

import com.sinbangsa.data.dto.MainpageDto;
import com.sinbangsa.data.dto.PreLoadingDto;
import com.sinbangsa.data.entity.*;
import com.sinbangsa.data.repository.*;
import com.sinbangsa.exception.ThemeNotFoundException;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class MainpageServiceImpl implements MainpageService{
    private final Logger LOGGER = LoggerFactory.getLogger(MainpageServiceImpl.class);
    private final StoreRepository storeRepository;
    private final UserStoreRelationRepository userStoreRelationRepository;
    private final ThemeRepository themeRepository;
    private final ThemeReviewRepository themeReviewRepository;
    private final ReservationRepository reservationRepository;
    private final UserRepository userRepository;

    @Override
    public MainpageDto getSearchResult(String searchWord) {
        LOGGER.info("[MainpageService] getSearchResult 호출");
        MainpageDto searchResult = new MainpageDto();
        List<MainpageDto.LStoreDto> lStoreDto = new ArrayList<>();
        List<MainpageDto.LThemeDto> lThemeDto = new ArrayList<>();

        List<Store> rplStorelist = storeRepository.findAllByStoreNameContaining(searchWord);
        for (Store store : rplStorelist){
            System.out.println("---------");
            MainpageDto.LStoreDto searchStore = new MainpageDto.LStoreDto();
            searchStore.setStoreId(store.getStoreId());
            searchStore.setStoreName(store.getStoreName());
            System.out.println(store.getStoreName());
            searchStore.setStoreImg(store.getPoster());
            searchStore.setStoreAddress(store.getAddress());
            searchStore.setLikeCount(userStoreRelationRepository.countByUserRelationStore(store));
            searchStore.setHomepage(store.getHomepage());
            searchStore.setMapX(store.getMapX());
            searchStore.setMapY(store.getMapY());
            searchStore.setTel(store.getTel());

            List<Theme> themeList;
            themeList = themeRepository.findAllByStore(store);
            if (themeList == null) {
                throw new ThemeNotFoundException();
            }

            Map<Theme,Integer> maximumReview = new HashMap<>();
            for (Theme theme : themeList){
                int count = themeReviewRepository.countAllByReviewTheme(theme);
                maximumReview.put(theme,count);
            }

            Theme maxTheme = null;
            for (Theme key : maximumReview.keySet()) {
                if (maxTheme == null || maximumReview.get(key) > maximumReview.get(maxTheme)) {
                    maxTheme = key;
                }
            }


            MainpageDto.MostReviewedThemeDto mostReviewedTheme = new MainpageDto.MostReviewedThemeDto();
            mostReviewedTheme.setThemeId(maxTheme.getId());
            mostReviewedTheme.setThemeName(maxTheme.getThemeName());
            mostReviewedTheme.setThemeImg(maxTheme.getPoster());

            if (maximumReview.get(maxTheme) == 0 ){
                mostReviewedTheme.setStar(-1);
            } else {
                mostReviewedTheme.setStar(themeReviewRepository.getAvgStar(maxTheme).orElse(null));
            }
            searchStore.setMostReviewedTheme(mostReviewedTheme);
            lStoreDto.add(searchStore);
        }
        searchResult.setStoreList(lStoreDto);

        List<Theme> rplThemeList = themeRepository.findAllByThemeNameContaining(searchWord);
        for (Theme theme : rplThemeList) {
            MainpageDto.LThemeDto searchTheme = new MainpageDto.LThemeDto();
            searchTheme.setThemeId(theme.getId());
            searchTheme.setThemeName(theme.getThemeName());
            searchTheme.setThemeImg(theme.getPoster());
            if (themeReviewRepository.countAllByReviewTheme(theme) == 0) {
                searchTheme.setStar(-1);
                searchTheme.setRandomReview("리뷰가 없습니다.");
            } else {
                searchTheme.setStar(themeReviewRepository.getAvgStar(theme).orElse(null));
                searchTheme.setRandomReview(themeReviewRepository.randomReview(theme).getContent());
            }


            lThemeDto.add(searchTheme);
        }

        searchResult.setThemelist(lThemeDto);

        return searchResult;
    }

    @Override
    public PreLoadingDto getPreLoading(){
        LOGGER.info("[MainpageService] getPreLoading 호출");
        PreLoadingDto preLoading = new PreLoadingDto();
        List<PreLoadingDto.ReservationDto> reservationList = new ArrayList<>();

        // 토큰 전까지 임시 user
        User user = userRepository.findById(1);

        // 해당 유저의 앞으로 예약
        List<Reservation> upcommingReservation = reservationRepository.findAllByReservationUser(user);

        for (Reservation reservation : upcommingReservation){
            PreLoadingDto.ReservationDto userReservtion = new PreLoadingDto.ReservationDto();
            userReservtion.setReservationId(reservation.getReservationId());
            userReservtion.setThemeName(reservation.getThemeTime().getTheme().getThemeName());
            userReservtion.setStoreName(reservation.getThemeTime().getTheme().getStore().getStoreName());
            userReservtion.setReservationTime(reservation.getThemeTime().getTime());
            userReservtion.setReservationDate(reservation.getDate());

            reservationList.add(userReservtion);
        }

        preLoading.setReservationList(reservationList);
        return preLoading;

    }
}
