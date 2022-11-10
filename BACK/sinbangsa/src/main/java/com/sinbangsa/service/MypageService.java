package com.sinbangsa.service;


import com.sinbangsa.data.dto.MypageInfoDto;
import com.sinbangsa.data.dto.MypageLikeDto;
import com.sinbangsa.data.dto.MypageReviewDto;

import java.util.List;

public interface MypageService {

    MypageInfoDto getMyPageInfo();

    List<MypageLikeDto> getLikes();

    List<MypageReviewDto> getReviews();
}
