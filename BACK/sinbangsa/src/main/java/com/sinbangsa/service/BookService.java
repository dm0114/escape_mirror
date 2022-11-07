package com.sinbangsa.service;


import com.sinbangsa.data.dto.StoreDetailDto;
import com.sinbangsa.data.dto.StoreDto;

import java.util.List;

public interface BookService {

    List<StoreDto> getStoreList(String region);

    StoreDetailDto getStoreDetail(Long storeId);

}
