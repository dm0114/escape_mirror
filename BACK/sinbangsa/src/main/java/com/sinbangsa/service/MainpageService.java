package com.sinbangsa.service;

import com.sinbangsa.data.dto.MainpageDto;
import com.sinbangsa.data.dto.PreLoadingDto;
import com.sinbangsa.data.dto.TransferDto;

import java.util.List;

public interface MainpageService {
    MainpageDto getSearchResult(String searchWord);
    PreLoadingDto getPreLoading();

    List<TransferDto> getTransfers(String region);
}
