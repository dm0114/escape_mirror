package com.sinbangsa.service;

import com.sinbangsa.data.dto.KakaoTokenDto;
import com.sinbangsa.data.dto.KakaoUserDto;

public interface UserService {

//    boolean join(UserDto userDto);
    KakaoTokenDto getAccessTokenByCode(String code);
    KakaoUserDto getProfile(String kakaotoken);

}
