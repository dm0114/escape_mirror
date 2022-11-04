package com.sinbangsa.service;


import com.sinbangsa.data.dto.BookDto;

import java.util.List;

public interface BookService {

    List<BookDto> getCafeList(String region);

}
