package com.sinbangsa.service;


import com.sinbangsa.data.dto.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

public interface MypageService {

    MypageInfoDto getMyPageInfo();

    List<MypageLikeDto> getLikes();

    List<MypageReviewDto> getReviews();

    MypageMyRoomDto getMypageMyRooms();

    void updateUserInfo(UpdateUserInfoRequestDto updateUserInfoRequestDto, HttpServletRequest httpServletRequest);

}
