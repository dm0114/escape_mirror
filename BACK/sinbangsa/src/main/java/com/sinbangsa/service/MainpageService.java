package com.sinbangsa.service;

import com.sinbangsa.data.dto.MainpageDto;
import com.sinbangsa.data.dto.PreLoadingDto;

public interface MainpageService {
    MainpageDto getSearchResult(String searchWord);
    PreLoadingDto getPreLoading();
}
