package com.sinbangsa.service;

import com.sinbangsa.data.dto.KakaoLoginResponseDto;
import com.sinbangsa.data.dto.KakaoUserDto;
import com.sinbangsa.data.entity.User;

public interface UserService {

//    boolean join(UserDto userDto);
    KakaoLoginResponseDto getAccessTokenByCode(String code);
    User getUserinfoByToken(String kakaotoken);

}
