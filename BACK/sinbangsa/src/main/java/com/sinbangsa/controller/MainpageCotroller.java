package com.sinbangsa.controller;

import com.sinbangsa.data.dto.MainpageDto;
import com.sinbangsa.data.dto.PreLoadingDto;
import com.sinbangsa.data.dto.TransferDto;
import com.sinbangsa.service.MainpageService;
import com.sinbangsa.utils.JwtTokenProvider;
import io.jsonwebtoken.Claims;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.nio.charset.Charset;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/mainpage")
@Api(value = "메인페이지 API", tags = {"메인페이지 API"})
public class MainpageCotroller {

    private final Logger LOGGER = LoggerFactory.getLogger(MainpageCotroller.class);

    private static final String SUCCESS = "success";

    private static final String FAIL = "fail";

    private final JwtTokenProvider jwtTokenProvider;

    private final MainpageService mainpageService;

    @GetMapping("/test")
    @ApiOperation(value = "테스트")
    public void test(HttpServletRequest httpServletRequest){
        String apptoken = jwtTokenProvider.resolveToken(httpServletRequest);
        Long userId = jwtTokenProvider.getUserId(apptoken);

        System.out.println(userId);

    }

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
        try {
            MainpageDto searchResult = mainpageService.getSearchResult(searchWord);
            return new ResponseEntity<>(searchResult, headers, HttpStatus.OK);
        }catch (Exception e) {
            MainpageDto mainpageDto = new MainpageDto();
            return new ResponseEntity<>(mainpageDto, headers, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/transfer")
    @ApiOperation(value = "양도리스트")
    public ResponseEntity<List<TransferDto>> getTransfers(@RequestParam String region) {
        LOGGER.info("[MainpageController] getSearchResult 호출");
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
        try {
            List<TransferDto> result = mainpageService.getTransfers(region);
            return new ResponseEntity<>(result, headers, HttpStatus.OK);
        }catch (Exception e) {

            return new ResponseEntity<>(headers, HttpStatus.BAD_REQUEST);
        }
    }

}
