package com.sinbangsa.service;

import com.sinbangsa.data.dto.KakaoLoginResponseDto;
import com.sinbangsa.data.dto.KakaoUserDto;
import com.sinbangsa.data.entity.User;

public interface UserService {

    KakaoLoginResponseDto kakaoLogin(String kakaotoken);

    User getUserinfoByToken(String kakaotoken);
}
