package com.sinbangsa.service;


import com.sinbangsa.data.dto.StoreDetailDto;
import com.sinbangsa.data.dto.StoreDto;
import com.sinbangsa.data.dto.ThemeDetailInfoDto;
import com.sinbangsa.data.dto.ThemeForThemeListDto;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

public interface BookService {

    List<StoreDto> getStoreList(String region, int page, HttpServletRequest httpServletRequest);

    StoreDetailDto getStoreDetail(long storeId, HttpServletRequest httpServletRequest);

    ThemeDetailInfoDto getThemeDetail(long themeId, int page);

    List<ThemeForThemeListDto> getThemeList(long storeId, HttpServletRequest httpServletRequest);

    Boolean themeLike(long themeId, HttpServletRequest httpServletRequest);

    Boolean themeLikeCancel(long themeId, HttpServletRequest httpServletRequest);


}
