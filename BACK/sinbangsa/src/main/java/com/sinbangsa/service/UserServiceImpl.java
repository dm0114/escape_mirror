package com.sinbangsa.service;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sinbangsa.data.dto.KakaoLoginResponseDto;
import com.sinbangsa.data.dto.KakaoUserDto;
import com.sinbangsa.data.entity.User;
import com.sinbangsa.data.repository.UserRepository;
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


@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final Logger LOGGER = LoggerFactory.getLogger(UserServiceImpl.class);

    private final UserRepository userRepository;


    @Value("${kakaoRestApiKey}")
    private String kakaorestApiKey;

    @Value("${kakaoRedirectUri}")
    private String kakaoRedirectUri;

    @Value("${kakaoClientSecret}")
    private String kakaoClientSecret;



    public KakaoLoginResponseDto getAccessTokenByCode(String code){

        LinkedMultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", kakaorestApiKey);
        params.add("redirect_uri", kakaoRedirectUri);
        params.add("code", code);
        params.add("client_secret", kakaoClientSecret);

        System.out.println(params);

        String url = "https://kauth.kakao.com/oauth/token";

        WebClient wc = WebClient.create(url);
        String response = wc.post()
                .uri(url)
                .body(BodyInserters.fromFormData(params))
                .header("Content-type","application/x-www-form-urlencoded")
                .retrieve()
                .bodyToMono(String.class)
                .block();

        System.out.println(params);

        ObjectMapper objectMapper = new ObjectMapper();
        KakaoLoginResponseDto kakaoToken = null;

        try{
            kakaoToken = objectMapper.readValue(response, KakaoLoginResponseDto.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        System.out.println(kakaoToken);

        return kakaoToken;
    }

    public User getUserinfoByToken(String kakaotoken){

        WebClient webClient = WebClient.create();
        KakaoUserDto kakaoUser = webClient.get()
                .uri("https://kapi.kakao.com/v2/user/me")
                .header("Authorization","Bearer "+kakaotoken)
                .retrieve()
                .bodyToMono(KakaoUserDto.class)
                .block();

        User loginUser = User.builder()
                        .email(kakaoUser.getKakaoAccount().getEmail())
                        .profile(kakaoUser.getProperties().getThumbnailImage())
                        .nickname(kakaoUser.getProperties().getNickname())
                        .build();

        String email = loginUser.getEmail();
        User user = userRepository.getByEmail(email).orElse(null);

        if (user == null) {
            userRepository.save(loginUser);
        }

        return loginUser;




        }



//    @Transactional
//    public boolean join(UserDto userDto) {
//        SHA256 sha256 = new SHA256();
//        User user = new User();
//
//        try {
//            user.setUsername(userDto.getUsername());
//            user.setNickname(userDto.getNickname());
//            user.setEmail(userDto.getEmail());
//
//
//            userRepository.save(user);
//            return true;
//        } catch (Exception e) {
//            throw new RuntimeException();
//        }
//    }

}
