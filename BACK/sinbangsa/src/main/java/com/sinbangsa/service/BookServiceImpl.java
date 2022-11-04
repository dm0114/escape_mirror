package com.sinbangsa.service;


import com.sinbangsa.data.dto.BookDto;
import com.sinbangsa.data.dto.StoreDto;
import com.sinbangsa.data.entity.Store;
import com.sinbangsa.data.entity.Theme;
import com.sinbangsa.data.repository.BookRepository;
import com.sinbangsa.data.repository.StoreRepository;
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


    public List<BookDto> getCafeList(String region) {
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

        List<Store> cafesRepo = storeRepository.findAllByRegionContaining(region);

        for (Store cafe : cafesRepo) {
            StoreDto storeDto = new StoreDto();
            storeDto.setStoreId(cafe.getStoreId());
            storeDto.setStoreImg(cafe.getPoster());
            storeDto.setStoreName(cafe.getStoreName());
            List<Theme> themes = cafe.getThemes();
            for (Theme theme : themes) {
                long themeId = theme.getId();
                long userId = (long) 1; //유저 ID 필요


            }
            storeDto.setClear();
        }





    }


}
