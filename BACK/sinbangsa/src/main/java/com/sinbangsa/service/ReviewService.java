package com.sinbangsa.service;


import com.sinbangsa.data.dto.ReviewDto;

import javax.servlet.http.HttpServletRequest;

public interface ReviewService {

    boolean createReview(ReviewDto reviewDto, HttpServletRequest httpServletRequest);

}
