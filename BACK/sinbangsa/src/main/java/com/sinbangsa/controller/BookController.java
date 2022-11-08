package com.sinbangsa.controller;



import com.sinbangsa.data.dto.*;
import com.sinbangsa.service.BookService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;
import java.util.List;

@RestController
@RequestMapping("/api/book")
@RequiredArgsConstructor
@Api(value = "도감 API", tags = {"도감 API"})
public class BookController {

    private final Logger LOGGER = LoggerFactory.getLogger(BookController.class);

    private static final String SUCCESS = "success";

    private static final String FAIL = "fail";

    private final BookService bookService;

    @GetMapping("/store")
    @ApiOperation(value = "지역별 카페리스트")
    public ResponseEntity<List<StoreDto>> getStoreList(@RequestParam String region) {
        LOGGER.info("[BookController] getCafeList 호출");
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", StandardCharsets.UTF_8));
        List<StoreDto> result = bookService.getStoreList(region);
        return new ResponseEntity<List<StoreDto>>(result, headers, HttpStatus.OK);


    }


    @GetMapping("/store/{storeId}")
    @ApiOperation(value = "카페 상세정보")
    public ResponseEntity<StoreDetailDto> getStoreDetail(@PathVariable Long storeId) {
        LOGGER.info("[BookController] getStoreDetail 호출");
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", StandardCharsets.UTF_8));
        StoreDetailDto result = bookService.getStoreDetail(storeId);
        return new ResponseEntity<StoreDetailDto>(result, headers, HttpStatus.OK);
    }

    @GetMapping("/theme")
    @ApiOperation(value = "카페별 테마리스트")
    public ResponseEntity<List<ThemeForThemeListDto>> getThemeList(@RequestParam long storeId) {
        LOGGER.info("[BookController] getThemeList 호출");
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", StandardCharsets.UTF_8));
        List<ThemeForThemeListDto> result = bookService.getThemeList(storeId);
        return new ResponseEntity<List<ThemeForThemeListDto>>(result, headers, HttpStatus.OK);

    }

    @GetMapping("/theme/{themeId}")
    @ApiOperation(value = "테마 상세정보")
    public ResponseEntity<ThemeDetailInfoDto> getThemeDetail(@PathVariable Long themeId) {
        LOGGER.info("[BookController] getStoreDetail 호출");
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", StandardCharsets.UTF_8));
        ThemeDetailInfoDto result = bookService.getThemeDetail(themeId);
        return new ResponseEntity<ThemeDetailInfoDto>(result, headers, HttpStatus.OK);
    }


}
