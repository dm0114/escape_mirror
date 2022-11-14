package com.sinbangsa.service;


import com.sinbangsa.data.dto.ReviewDto;
import com.sinbangsa.data.dto.ReviewUpdateDto;

import javax.servlet.http.HttpServletRequest;

public interface ReviewService {

    boolean createReview(ReviewDto reviewDto, HttpServletRequest httpServletRequest);
    boolean updateReview(long reviewId, ReviewUpdateDto reviewUpdate, HttpServletRequest httpServletRequest);
}
