package com.sinbangsa.service;


import com.sinbangsa.data.dto.StoreDetailDto;
import com.sinbangsa.data.dto.StoreDto;
import com.sinbangsa.data.dto.ThemeDetailInfoDto;
import com.sinbangsa.data.dto.ThemeForThemeListDto;

import java.util.List;

public interface BookService {

    List<StoreDto> getStoreList(String region);

    StoreDetailDto getStoreDetail(long storeId);

    ThemeDetailInfoDto getThemeDetail(long themeId);

    List<ThemeForThemeListDto> getThemeList(long storeId);


}
