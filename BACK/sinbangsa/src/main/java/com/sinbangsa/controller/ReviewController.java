package com.sinbangsa.controller;


import com.sinbangsa.data.dto.ReviewDto;
import com.sinbangsa.data.dto.ReviewUpdateDto;
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
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.nio.charset.Charset;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/review")
@Api(value = "리뷰 API", tags = {"리뷰 API"})
public class ReviewController {

    private final Logger LOGGER = LoggerFactory.getLogger(ReviewController.class);

    private static final String SUCCESS = "success";

    private static final String FAIL = "fail";

    private final ReviewService reviewService;

    @PostMapping
    @ApiOperation(value = "리뷰 작성")
    public ResponseEntity<Boolean> createReview(@RequestBody ReviewDto reviewDto, HttpServletRequest httpServletRequest) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        boolean result = reviewService.createReview(reviewDto, httpServletRequest);

        if (result) {
            return new ResponseEntity<>(result, headers, HttpStatus.ACCEPTED);
        }
        return new ResponseEntity<>(result, headers, HttpStatus.BAD_REQUEST);

    }

    @PutMapping("/{reviewId}")
    @ApiOperation(value = "리뷰 수정")
    public ResponseEntity<Boolean> updateReview(@PathVariable long reviewId, @RequestBody ReviewUpdateDto reviewUpdate, HttpServletRequest httpServletRequest){
        LOGGER.info("[ReviewController] updateReview 호출");
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        boolean result = reviewService.updateReview(reviewId, reviewUpdate, httpServletRequest);
        if (result) {
            return new ResponseEntity<>(result, headers, HttpStatus.ACCEPTED);
        }
        return new ResponseEntity<>(result, headers, HttpStatus.BAD_REQUEST);

    }

}

