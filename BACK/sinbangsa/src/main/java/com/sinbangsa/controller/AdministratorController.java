package com.sinbangsa.controller;

import com.sinbangsa.data.dto.*;
import com.sinbangsa.service.AdministratorService;
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

import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin")
@Api(value = "관리자페이지 API", tags = {"관리자페이지 API"})
public class AdministratorController {
    private final Logger LOGGER = LoggerFactory.getLogger(MainpageCotroller.class);

    private static final String SUCCESS = "success";

    private static final String FAIL = "fail";

    private final AdministratorService administratorService;


    @GetMapping("/store")
    @ApiOperation(value = "카페 상세정보")
    public ResponseEntity<List<AdminStoreDto>> getAdminStoreDetail(){
        LOGGER.info("[AdministratorController] preLoading 호출");
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
        // 어드민 아이디 토큰에서 가져오기
        long adminId = 234212;
        List<AdminStoreDto> adminStoreDetail = administratorService.getAdminStoreDetail(adminId);

        return new ResponseEntity<>(adminStoreDetail, headers, HttpStatus.OK);
    }

    @PostMapping("/store")
    @ApiOperation(value = "카페 상세정보 등록")
    public ResponseEntity<Boolean> registerStoreDetail(@RequestBody StoreRegisterDto storeResgesterDto){
        LOGGER.info("[AdministratorController] registerStoreDetail 호출");
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", StandardCharsets.UTF_8));

        // 어드민 아이디 토큰에서 가져오기
        long adminId = 234212;

        boolean result = administratorService.registerStoreDetail(storeResgesterDto, adminId);
        if (result) {
            return new ResponseEntity<>(result, headers, HttpStatus.CREATED);
        }
        return new ResponseEntity<>(result, headers, HttpStatus.NO_CONTENT);
    }

    @PutMapping("/store")
    @ApiOperation(value = "카페 상세정보 수정")
    public ResponseEntity<Boolean> updateStoreDetail(@RequestBody AdminStoreDto adminStoreDto){
        LOGGER.info("[AdministratorController] updateStoreDetail 호출");
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", StandardCharsets.UTF_8));

        // 어드민 아이디 토큰에서 가져오기
        long adminId = 234212;
        boolean result = administratorService.updateStoreDetail(adminStoreDto, adminId);

        if (result) {
            return new ResponseEntity<>(result, headers, HttpStatus.ACCEPTED);
        }
        return new ResponseEntity<>(result, headers, HttpStatus.NO_CONTENT);
    }

    @GetMapping("/theme")
    @ApiOperation(value = "관리자 페이지 테마 리스트")
    public ResponseEntity<List<ThemeListDto>> getThemeList(@RequestParam Long storeId){
        LOGGER.info("[AdministratorController] getThemeList 호출");
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", StandardCharsets.UTF_8));

        // 어드민 아이디 토큰에서 가져오기
        long adminId = 234212;

        List<ThemeListDto> themeList = administratorService.getThemeList(storeId, adminId);
        return new ResponseEntity<>(themeList, headers, HttpStatus.OK);
    }

    @GetMapping("/theme/{themeId}")
    @ApiOperation(value = "관리자 페이지 테마 상세")
    public ResponseEntity<AdministratorThemeDetailDto> getThemeDetail(@PathVariable long themeId){
        LOGGER.info("[AdministratorController] getThemeDetail 호출");
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", StandardCharsets.UTF_8));

        // 어드민 아이디 토큰에서 가져오기
        long adminId = 234212;

        AdministratorThemeDetailDto themeDetail = administratorService.getThemeDetail(themeId, adminId);
        return new ResponseEntity<>(themeDetail, headers, HttpStatus.OK);
    }

    @PostMapping("/theme")
    @ApiOperation(value = "관리자 페이지 테마 등록")
    public ResponseEntity<Boolean> createTheme(@RequestBody ThemeRegisterDto themeRegister){
        LOGGER.info("[AdministratorController] createTheme 호출");
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", StandardCharsets.UTF_8));
        LOGGER.info("[AdministratorController] createTheme 호출{}",themeRegister.getReservationtime());
        // 어드민 아이디 토큰에서 가져오기
        long adminId = 234212;

        Boolean result = administratorService.registerThemeThemeTime(themeRegister, adminId);

        if (result) {
            return new ResponseEntity<>(result, headers, HttpStatus.CREATED);
        }
        return new ResponseEntity<>(result, headers, HttpStatus.BAD_REQUEST);
    }


}
