package com.sinbangsa.service;


import com.sinbangsa.data.dto.BookDto;
import com.sinbangsa.data.dto.StoreDetailDto;

import java.util.List;

public interface BookService {

//    List<BookDto> getCafeList(String region);

    StoreDetailDto getCafeDetail(Long storeId);

}
