package com.sinbangsa.controller;


import com.sinbangsa.data.dto.ReviewDto;
import com.sinbangsa.service.ReviewService;
import com.sinbangsa.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.nio.charset.Charset;

@RestController
@RequiredArgsConstructor
@RequestMapping("/review")
@Api(value = "리뷰 API", tags = {"리뷰작성"})
public class ReviewController {

    private final Logger LOGGER = LoggerFactory.getLogger(UserService.class);

    private static final String SUCCESS = "success";

    private static final String FAIL = "fail";

    private final ReviewService reviewService;

    @PostMapping
    @ApiOperation(value = "리뷰 작성")
    public ResponseEntity<String> createReview(@RequestBody ReviewDto reviewDto) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        boolean result = reviewService.createReview(reviewDto);
        if (!result) {


            return new ResponseEntity<>("리뷰 작성 실패", headers, HttpStatus.BAD_REQUEST);
        }


        return new ResponseEntity<>("리뷰 작성 성공", headers, HttpStatus.CREATED);
    }


}

