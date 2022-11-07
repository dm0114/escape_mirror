package com.sinbangsa.service;

import com.sinbangsa.data.dto.MainpageDto;
import com.sinbangsa.data.entity.Store;
import com.sinbangsa.data.entity.Theme;
import com.sinbangsa.data.entity.ThemeReview;
import com.sinbangsa.data.repository.StoreRepository;
import com.sinbangsa.data.repository.ThemeRepository;
import com.sinbangsa.data.repository.ThemeReviewRepository;
import com.sinbangsa.data.repository.UserStoreRelationRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class MainpageServiceImpl implements MainpageService{
    private final Logger LOGGER = LoggerFactory.getLogger(MainpageServiceImpl.class);
    private final StoreRepository storeRepository;
    private final UserStoreRelationRepository userStoreRelationRepository;
    private final ThemeRepository themeRepository;
    private final ThemeReviewRepository themeReviewRepository;

    @Override
    public MainpageDto getSearchResult(String searchWord) {
        LOGGER.info("[MainpageService] getSearchResult 호출");
        MainpageDto searchResult = new MainpageDto();
        List<MainpageDto.LStoreDto> lStoreDto = new ArrayList<>();
        List<MainpageDto.LThemeDto> lThemeDto = new ArrayList<>();
//        MainpageDto.MostReviewedThemeDto mostReviewedThemeDtos = new MainpageDto.MostReviewedThemeDto();
//        MainpageDto.RandomReviewDto randomReviewDto = new MainpageDto.RandomReviewDto();

        List<Store> rplStorelist = storeRepository.findAllByStoreNameContaining(searchWord);
        for (Store store : rplStorelist){
            MainpageDto.LStoreDto searchStore = new MainpageDto.LStoreDto();
            searchStore.setStoreId(store.getStoreId());
            searchStore.setStoreName(store.getStoreName());
            searchStore.setStoreImg(store.getPoster());
            searchStore.setLikeCount(userStoreRelationRepository.countAllByUserRelationStore(store));

            List<Theme> themeList;
            themeList = themeRepository.findAllByStore(store);

            Map<Theme,Integer> maximumReview = new HashMap<>();
            for (Theme theme : themeList){
                int count = themeReviewRepository.countAllByReviewTheme(theme);
                maximumReview.put(theme,count);
            }

            Theme maxTheme = Collections.max(maximumReview.entrySet(), (m1, m2) -> m2.getValue() - m1.getValue()).getKey();
            MainpageDto.MostReviewedThemeDto mostReviewedTheme = new MainpageDto.MostReviewedThemeDto();
            mostReviewedTheme.setThemeId(maxTheme.getId());
            mostReviewedTheme.setThemeName(maxTheme.getThemeName());
            mostReviewedTheme.setThemeImg(maxTheme.getPoster());
            mostReviewedTheme.setStar(themeReviewRepository.getAvgStar(maxTheme.getId()));

//            List<ThemeReview> themeReviews = new ArrayList<>();
//            themeReviews = themeReviewRepository.getThemeReviewsByReviewTheme(maxTheme);
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
            searchTheme.setStar(themeReviewRepository.getAvgStar(theme.getId()));
            searchTheme.setRandomReview(themeReviewRepository.randomReview(theme).getContent());

            lThemeDto.add(searchTheme);
        }

        searchResult.setThemelist(lThemeDto);

        return searchResult;
    }
}
