package com.sinbangsa.controller;


import com.sinbangsa.data.dto.BookDto;
import com.sinbangsa.data.dto.ThemeTimeDto;
import com.sinbangsa.service.BookService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.nio.charset.StandardCharsets;
import java.util.List;

@RestController
@RequestMapping("/book")
@RequiredArgsConstructor
@Api(value = "도감 API", tags = {"지역별 카페 리스트"})
public class BookController {

    private final Logger LOGGER = LoggerFactory.getLogger(BookController.class);

    private static final String SUCCESS = "success";

    private static final String FAIL = "fail";

    private final BookService bookService;

    @GetMapping("/store")
    public ResponseEntity<List<BookDto>> getCafeList(@RequestParam String region) {
        LOGGER.info("[BookController] getCafeList 호출");
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", StandardCharsets.UTF_8));
        List<ThemeTimeDto> result = bookService.
        return new ResponseEntity<List<ThemeTimeDto>>(result, headers, HttpStatus.OK);


    }

}
