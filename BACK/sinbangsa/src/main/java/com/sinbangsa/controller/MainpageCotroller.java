package com.sinbangsa.controller;

import com.sinbangsa.data.dto.MainpageDto;
import com.sinbangsa.data.dto.PreLoadingDto;
import com.sinbangsa.service.MainpageService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
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

import java.nio.charset.Charset;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/mainpage")
@Api(value = "메인페이지 API", tags = {"메인페이지 API"})
public class MainpageCotroller {

    private final Logger LOGGER = LoggerFactory.getLogger(MainpageCotroller.class);

    private static final String SUCCESS = "success";

    private static final String FAIL = "fail";

    private final MainpageService mainpageService;

    @GetMapping
    @ApiOperation(value = "프리로딩")
    public ResponseEntity<PreLoadingDto> preLoading(){
        LOGGER.info("[MainpageController] preLoading 호출");
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
        PreLoadingDto preLoading = mainpageService.getPreLoading();
        LOGGER.info("[MainpageController] getPreLoading 반환 성공");

        return new ResponseEntity<>(preLoading, headers, HttpStatus.OK);
    }


    @GetMapping("/search")
    @ApiOperation(value = "검색")
    public ResponseEntity<MainpageDto> getSearchResult(@RequestParam String searchWord){
        LOGGER.info("[MainpageController] getSearchResult 호출");
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
        MainpageDto searchResult = mainpageService.getSearchResult(searchWord);
        LOGGER.info("[MainpageController] getSearchResult 반환 성공");

        return new ResponseEntity<>(searchResult, headers, HttpStatus.OK);
    }

}
