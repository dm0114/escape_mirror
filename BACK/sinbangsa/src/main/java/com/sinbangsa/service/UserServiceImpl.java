package com.sinbangsa.service;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sinbangsa.data.dto.KakaoLoginResponseDto;
import com.sinbangsa.data.dto.KakaoUserDto;
import com.sinbangsa.data.entity.RefreshToken;
import com.sinbangsa.data.entity.User;
import com.sinbangsa.data.repository.RefreshTokenRepository;
import com.sinbangsa.data.repository.UserRepository;
import com.sinbangsa.utils.JwtTokenProvider;
import com.sinbangsa.utils.Role;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Collections;


@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final Logger LOGGER = LoggerFactory.getLogger(UserServiceImpl.class);

    private final UserRepository userRepository;

    private final JwtTokenProvider jwtTokenProvider;

    private final RefreshTokenRepository refreshTokenRepository;


    @Value("${kakaoRestApiKey}")
    private String kakaorestApiKey;

    @Value("${kakaoRedirectUri}")
    private String kakaoRedirectUri;

    @Value("${kakaoClientSecret}")
    private String kakaoClientSecret;


    public KakaoLoginResponseDto kakaoLogin(String kakaotoken){

        try{
            LOGGER.info("로그인 시작");
            User loginUser = getUserinfoByToken(kakaotoken);
            LOGGER.info("유저 로그인");

            String userEmail = loginUser.getEmail();
            Long userId = loginUser.getId();

            String accessToken = jwtTokenProvider.createAccessToken(userEmail,userId,loginUser.getRoles());
            String refreshToken = jwtTokenProvider.createRefreshToken(userEmail,userId,loginUser.getRoles());

            KakaoLoginResponseDto kakaoLoginResponseDto = new KakaoLoginResponseDto();
            kakaoLoginResponseDto.setRefreshToken(refreshToken);
            kakaoLoginResponseDto.setAccessToken(accessToken);

            return kakaoLoginResponseDto;
        } catch (Exception e) {
            LOGGER.info("로그인 실패");
            return null;
        }


    }

    public User getUserinfoByToken(String kakaotoken) {

        WebClient webClient = WebClient.create();
        KakaoUserDto kakaoUser = webClient.get()
                .uri("https://kapi.kakao.com/v2/user/me")
                .header("Authorization", "Bearer " + kakaotoken)
                .retrieve()
                .bodyToMono(KakaoUserDto.class)
                .block();
        
        LOGGER.info("유저정보 받아옴");


        String email = kakaoUser.getKakaoAccount().getEmail();

        User user = userRepository.getByEmail(email).orElse(null);


        if (user == null) {
            User loginUser = User.builder()
                    .email(kakaoUser.getKakaoAccount().getEmail())
                    .profile(kakaoUser.getProperties().getThumbnailImage())
                    .nickname(kakaoUser.getProperties().getNickname())
                    .roles(Collections.singletonList(Role.USER))
                    .grade(0)
                    .admin(false)
                    .build();

            user = userRepository.save(loginUser);
        }

        return user;
    }

    public Boolean kakaoLogout(String refreshToken){

        RefreshToken ref = refreshTokenRepository.findRefreshTokenByRefreshToken(refreshToken).orElse(null);
        if (ref == null) {
            return false;
        }
        refreshTokenRepository.delete(ref);
        return true;

    }
}


