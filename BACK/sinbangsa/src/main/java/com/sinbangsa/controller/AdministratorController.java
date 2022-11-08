package com.sinbangsa.controller;

import com.sinbangsa.data.dto.AdminStoreDto;
import com.sinbangsa.data.entity.Admin;
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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.nio.charset.Charset;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/admin")
@Api(value = "관리자페이지 API", tags = {"관리자페이지 API"})
public class AdministratorController {
    private final Logger LOGGER = LoggerFactory.getLogger(MainpageCotroller.class);

    private static final String SUCCESS = "success";

    private static final String FAIL = "fail";

    private final AdministratorService administratorService;


    @GetMapping("/store")
    @ApiOperation(value = "카페 상세정보")
    public ResponseEntity<List<AdminStoreDto>> getAdminStoreDetail(){
        LOGGER.info("[MainpageController] preLoading 호출");
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
        // 어드민 아이디 토큰에서 가져오기
        long adminId = 234212;
        List<AdminStoreDto> adminStoreDetail = administratorService.getAdminStoreDetail(adminId);

        return new ResponseEntity<>(adminStoreDetail, headers, HttpStatus.OK);
    }
}
