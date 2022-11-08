package com.sinbangsa.service;


import com.sinbangsa.data.dto.StoreDetailDto;
import com.sinbangsa.data.dto.StoreDto;
import com.sinbangsa.data.dto.ThemeDetailDto;
import com.sinbangsa.data.entity.Store;
import com.sinbangsa.data.entity.Theme;
import com.sinbangsa.data.entity.User;
import com.sinbangsa.data.repository.*;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BookServiceImpl implements BookService {

    private final Logger LOGGER = LoggerFactory.getLogger(BookServiceImpl.class);


    private final BookRepository bookRepository;

    private final StoreRepository storeRepository;

    private final ThemeRepository themeRepository;

    private final UserRepository userRepository;

    private final ThemeReviewRepository themeReviewRepository;

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

    public StoreDetailDto getStoreDetail(Long storeId) {
        LOGGER.info("[BookService] getCafeDetail 호출");

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
            if (themeReviewRepository.getAvgStar(themeRepo) == null) {
                themeDetailDto.setStar(0);
            } else {
                themeDetailDto.setStar((int) Math.round(themeReviewRepository.getAvgStar(themeRepo)));
            }


            themeDetailDtoList.add(themeDetailDto);

        }
        storeDetailDto.setThemeDetailDtoList(themeDetailDtoList);
        LOGGER.info("[BookService] getCafeDetail 성공");
        return storeDetailDto;
    }


}
