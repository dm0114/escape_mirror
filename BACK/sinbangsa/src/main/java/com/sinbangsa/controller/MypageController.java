package com.sinbangsa.controller;


import com.sinbangsa.data.dto.*;
import com.sinbangsa.service.MypageService;
import com.sinbangsa.utils.JwtTokenProvider;
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

import javax.servlet.http.HttpServletRequest;
import java.nio.charset.StandardCharsets;
import java.util.List;

@RestController
@RequestMapping("/api/mypage")
@RequiredArgsConstructor
@Api(value = "마이페이지 API", tags = "마이페이지 API")
public class MypageController {

    private final Logger LOGGER = LoggerFactory.getLogger(MypageController.class);

    private final MypageService mypageService;

    private final JwtTokenProvider jwtTokenProvider;

    @GetMapping
    @ApiOperation(value = "정보 받아오기")
    public ResponseEntity<MypageInfoDto> getMypageInfo() {
        LOGGER.info("[MypageController] getMyPageInfo 호출");
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", StandardCharsets.UTF_8));
        MypageInfoDto result = mypageService.getMyPageInfo();
        return new ResponseEntity<MypageInfoDto>(result, headers, HttpStatus.OK);

    }



    @GetMapping("/likes")
    @ApiOperation(value = "찜 목록")
    public ResponseEntity<List<MypageLikeDto>> getLikes() {
        LOGGER.info("[MypageController] getLikes 호출");
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", StandardCharsets.UTF_8));
        List<MypageLikeDto> result = mypageService.getLikes();
        return new ResponseEntity<List<MypageLikeDto>>(result, headers, HttpStatus.OK);
    }

    @GetMapping("/reviews")
    @ApiOperation(value = "리뷰 목록")
    public ResponseEntity<List<MypageReviewDto>> getReviews() {
        LOGGER.info("[MypageController] getReviews 호출");
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", StandardCharsets.UTF_8));
        List<MypageReviewDto> result = mypageService.getReviews();
        return new ResponseEntity<List<MypageReviewDto>>(result, headers, HttpStatus.OK);
    }

    @GetMapping("/acts")
    @ApiOperation(value = "활동 내역 목록")
    public ResponseEntity<MypageMyRoomDto> getMyRooms() {
        LOGGER.info("[MypageController] getMyRooms 호출");
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", StandardCharsets.UTF_8));
        MypageMyRoomDto result = mypageService.getMypageMyRooms();
        return new ResponseEntity<MypageMyRoomDto>(result, headers, HttpStatus.OK);
    }

    @PutMapping("/update")
    @ApiOperation(value = "개인 정보 수정")
    public ResponseEntity updateUserInfo(@RequestBody UpdateUserInfoRequestDto updateUserInfoRequestDto, HttpServletRequest httpServletRequest) {
        LOGGER.info("[MypageController] updateUserInfo");
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", StandardCharsets.UTF_8));

        String token = jwtTokenProvider.resolveToken(httpServletRequest);
//        long userId = jwtTokenProvider.get
        mypageService.updateUserInfo(updateUserInfoRequestDto, httpServletRequest);
        return new ResponseEntity(headers, HttpStatus.ACCEPTED);
    }


}
