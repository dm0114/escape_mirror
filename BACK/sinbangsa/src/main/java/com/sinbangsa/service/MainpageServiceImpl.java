package com.sinbangsa.service;

import com.sinbangsa.data.dto.MainpageDto;
import com.sinbangsa.data.dto.PreLoadingDto;
import com.sinbangsa.data.dto.TransferDto;
import com.sinbangsa.data.dto.TransferSearchDto;
import com.sinbangsa.data.entity.*;
import com.sinbangsa.data.repository.*;
import com.sinbangsa.exception.ThemeNotFoundException;
import com.sinbangsa.utils.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
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

    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public MainpageDto getSearchResult(String searchWord, int page) {
        LOGGER.info("[MainpageService] getSearchResult 호출");
        MainpageDto searchResult = new MainpageDto();
        List<MainpageDto.LStoreDto> lStoreDto = new ArrayList<>();
        List<MainpageDto.LThemeDto> lThemeDto = new ArrayList<>();

        PageRequest pageRequest = PageRequest.of(page, 4);
        List<Store> rplStorelist = storeRepository.findAllByStoreNameContaining(searchWord, pageRequest);
        for (Store store : rplStorelist){
            MainpageDto.LStoreDto searchStore = new MainpageDto.LStoreDto();
            searchStore.setStoreId(store.getStoreId());
            searchStore.setStoreName(store.getStoreName());
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

        List<Theme> rplThemeList = themeRepository.findAllByThemeNameContaining(searchWord, pageRequest);
        for (Theme theme : rplThemeList) {
            MainpageDto.LThemeDto searchTheme = new MainpageDto.LThemeDto();
            searchTheme.setThemeId(theme.getId());
            searchTheme.setThemeName(theme.getThemeName());
            searchTheme.setThemeImg(theme.getPoster());
            searchTheme.setStoreName(theme.getStore().getStoreName());
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
        searchResult.setStoreCount(storeRepository.countStoreByStoreNameContaining(searchWord));
        searchResult.setThemeCount(themeRepository.countThemeByThemeNameContaining(searchWord));

        return searchResult;
    }

    @Override
    public PreLoadingDto getPreLoading(HttpServletRequest httpServletRequest){
        LOGGER.info("[MainpageService] getPreLoading 호출");
        PreLoadingDto preLoading = new PreLoadingDto();
        List<PreLoadingDto.ReservationDto> reservationList = new ArrayList<>();

        String apptoken = jwtTokenProvider.resolveToken(httpServletRequest);
        Long userId = jwtTokenProvider.getUserId(apptoken);

        // 토큰 전까지 임시 user
        User user = userRepository.findById(userId).orElse(null);

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

    @Transactional(readOnly = true)
    public List<TransferDto> getTransfers(String region) {
        LOGGER.info("[MainpageService] getTransfers 호출");
        try {
            List<TransferDto> transfers = new ArrayList<>();
            List<Reservation> reservationsRepo = reservationRepository.getTransfer();

            if (reservationsRepo.isEmpty()) {
                return transfers;
            }

            for (Reservation reservationRepo : reservationsRepo) {
                if (region.equals(reservationRepo.getThemeTime().getTheme().getStore().getRegion()) ) {
                    TransferDto transferDto = new TransferDto();
                    Theme themeRepo = reservationRepo.getThemeTime().getTheme();
                    Store storeRepo = themeRepo.getStore();
                    transferDto.setStoreId(storeRepo.getStoreId());
                    transferDto.setStoreName(storeRepo.getStoreName());
                    transferDto.setThemeId(themeRepo.getId());
                    transferDto.setThemeName(themeRepo.getThemeName());
                    transferDto.setReservedDate(reservationRepo.getDate());
                    transferDto.setReservedTime(reservationRepo.getThemeTime().getTime());
                    transferDto.setReservedName(reservationRepo.getReservationUser().getNickname());
                    transfers.add(transferDto);
                }
            }
            return transfers;
        } catch (Exception e) {
            throw e;
        }
    }


    @Transactional(readOnly = true)
    public TransferSearchDto getTransferSearch(String searchWord) {
        LOGGER.info("[MainpageService] getTransferSearch 호출");
        try {
            List<Reservation> reservationsRepo = reservationRepository.getTransfer();

            TransferSearchDto transferSearchDto = new TransferSearchDto();
            List<TransferDto> stores = new ArrayList<>();
            List<TransferDto> themes = new ArrayList<>();
            for (Reservation reservationRepo : reservationsRepo) {
                Store storeRepo = reservationRepo.getThemeTime().getTheme().getStore();
                Theme themeRepo = reservationRepo.getThemeTime().getTheme();
                if (storeRepo.getStoreName().contains(searchWord)) {
                    TransferDto transferDto = new TransferDto();
                    transferDto.setStoreId(storeRepo.getStoreId());
                    transferDto.setStoreName(storeRepo.getStoreName());
                    transferDto.setThemeId(themeRepo.getId());
                    transferDto.setThemeName(themeRepo.getThemeName());
                    transferDto.setReservedDate(reservationRepo.getDate());
                    transferDto.setReservedTime(reservationRepo.getThemeTime().getTime());
                    transferDto.setReservedName(reservationRepo.getReservationUser().getNickname());
                    stores.add(transferDto);
                }

                if (themeRepo.getThemeName().contains(searchWord)) {
                    TransferDto transferDto = new TransferDto();
                    transferDto.setStoreId(storeRepo.getStoreId());
                    transferDto.setStoreName(storeRepo.getStoreName());
                    transferDto.setThemeId(themeRepo.getId());
                    transferDto.setThemeName(themeRepo.getThemeName());
                    transferDto.setReservedDate(reservationRepo.getDate());
                    transferDto.setReservedTime(reservationRepo.getThemeTime().getTime());
                    transferDto.setReservedName(reservationRepo.getReservationUser().getNickname());
                    themes.add(transferDto);
                }

            }
            transferSearchDto.setStoreList(stores);
            transferSearchDto.setThemeList(themes);
            return transferSearchDto;
        } catch (Exception e) {
            throw e;
        }
    }

    @Transactional
    public Boolean putTransfer(Long reservationId, HttpServletRequest httpServletRequest) {
        LOGGER.info("[MainpageService] putTransfer 호출");
        final int NOT_TRANSFER_STATUS = 0;

        try {
            String token = jwtTokenProvider.resolveToken(httpServletRequest);
            Long userId = jwtTokenProvider.getUserId(token);
            User userRepo = userRepository.findById(userId).orElse(null);
            if (userRepo == null) {
                throw new NullPointerException("유저 정보가 잘못되었습니다.");
            }

            Reservation reservationRepo = reservationRepository.findByReservationId(reservationId).orElse(null);
            if (reservationRepo == null) {
                throw new NullPointerException("예약 정보가 잘못되었습니다.");
            }

            reservationRepo.update(userRepo, NOT_TRANSFER_STATUS);
            return true;
        } catch (Exception e) {
            throw e;
        }


    }
}
