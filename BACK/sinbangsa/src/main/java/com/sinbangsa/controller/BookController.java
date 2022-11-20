package com.sinbangsa.controller;



import com.sinbangsa.data.dto.*;
import com.sinbangsa.service.BookService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
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
    public ResponseEntity<List<StoreDto>> getStoreList(@RequestParam String region, @RequestParam int page, HttpServletRequest httpServletRequest, Pageable pageable) {
        LOGGER.info("[BookController] getCafeList 호출");
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", StandardCharsets.UTF_8));
        try {
            List<StoreDto> result = bookService.getStoreList(region, page, httpServletRequest);
            return new ResponseEntity<List<StoreDto>>(result, headers, HttpStatus.OK);
        } catch (NullPointerException e) {
            List<StoreDto> tmp = new ArrayList<>();
            return new ResponseEntity<List<StoreDto>>(tmp, headers, HttpStatus.BAD_REQUEST);
        }

    }


    @GetMapping("/store/{storeId}")
    @ApiOperation(value = "카페 상세정보")
    public ResponseEntity<StoreDetailDto> getStoreDetail(@PathVariable Long storeId, HttpServletRequest httpServletRequest) {
        LOGGER.info("[BookController] getStoreDetail 호출");
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", StandardCharsets.UTF_8));
        try {
            StoreDetailDto result = bookService.getStoreDetail(storeId, httpServletRequest);
            return new ResponseEntity<StoreDetailDto>(result, headers, HttpStatus.OK);
        } catch (Exception e) {
            StoreDetailDto result = new StoreDetailDto();
            return new ResponseEntity<StoreDetailDto>(result, headers, HttpStatus.BAD_REQUEST);
        }

    }

    @GetMapping("/theme")
    @ApiOperation(value = "카페별 테마리스트")
    public ResponseEntity<List<ThemeForThemeListDto>> getThemeList(@RequestParam long storeId, HttpServletRequest httpServletRequest) {
        LOGGER.info("[BookController] getThemeList 호출");
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", StandardCharsets.UTF_8));
        try {
            List<ThemeForThemeListDto> result = bookService.getThemeList(storeId, httpServletRequest);
            return new ResponseEntity<List<ThemeForThemeListDto>>(result, headers, HttpStatus.OK);
        } catch (Exception e) {
            List<ThemeForThemeListDto> result = new ArrayList<>();
            return new ResponseEntity<List<ThemeForThemeListDto>>(result, headers, HttpStatus.BAD_REQUEST);
        }


    }

    @GetMapping("/theme/{themeId}")
    @ApiOperation(value = "테마 상세정보")
    public ResponseEntity<ThemeDetailInfoDto> getThemeDetail(@PathVariable Long themeId, @RequestParam int page) {
        LOGGER.info("[BookController] getStoreDetail 호출");
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", StandardCharsets.UTF_8));
        try {
            ThemeDetailInfoDto result = bookService.getThemeDetail(themeId, page);
            return new ResponseEntity<ThemeDetailInfoDto>(result, headers, HttpStatus.OK);
        } catch (Exception e) {
            ThemeDetailInfoDto result = new ThemeDetailInfoDto();
            return new ResponseEntity<ThemeDetailInfoDto>(result, headers, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/theme/{themeId}/like")
    @ApiOperation(value = "테마 찜하기")
    public ResponseEntity<Boolean> themeLike(@PathVariable long themeId, HttpServletRequest httpServletRequest) {
        LOGGER.info("[BookController] themeLike 호출");
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", StandardCharsets.UTF_8));
        try {
            boolean result = bookService.themeLike(themeId, httpServletRequest);
            return new ResponseEntity<Boolean>(result, headers, HttpStatus.OK);
        } catch (Exception e) {
            boolean result = false;
            return new ResponseEntity<Boolean>(result, headers, HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/theme/{themeId}/like")
    @ApiOperation(value = "테마 찜하기 취소")
    public ResponseEntity<Boolean> themeLikeCancel(@PathVariable long themeId, HttpServletRequest httpServletRequest) {
        LOGGER.info("[BookController] themeLikeCancel 호출");
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", StandardCharsets.UTF_8));
        try {
            boolean result = bookService.themeLikeCancel(themeId, httpServletRequest);
            return new ResponseEntity<Boolean>(result, headers, HttpStatus.OK);
        } catch (Exception e) {
            boolean result = false;
            return new ResponseEntity<Boolean>(result, headers, HttpStatus.BAD_REQUEST);
        }
    }

}
