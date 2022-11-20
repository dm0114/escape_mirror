package com.sinbangsa.controller;


import com.sinbangsa.data.dto.KakaoLoginRequestDto;
import com.sinbangsa.data.dto.KakaoLoginResponseDto;
import com.sinbangsa.data.dto.KakaoLogoutDto;
import com.sinbangsa.data.dto.KakaoUserDto;
import com.sinbangsa.data.entity.User;
import com.sinbangsa.service.UserService;
import com.sinbangsa.utils.JwtTokenProvider;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.hibernate.tool.schema.internal.exec.ScriptTargetOutputToFile;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/user")
@Api(value = "유저 API", tags = {"유저 API"})
@RequiredArgsConstructor
public class UserController {

    private final Logger LOGGER = LoggerFactory.getLogger(UserController.class);

    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";
    private final UserService userService;

    private final JwtTokenProvider jwtTokenProvider;



    @ApiOperation(value = "카카오 회원관리")
    @PostMapping("/kakao")
    public ResponseEntity<KakaoLoginResponseDto> kakaoLogin(@RequestBody KakaoLoginRequestDto kakaoLoginRequestDto) {
        String kakaoToken = kakaoLoginRequestDto.getAccessToken();
        KakaoLoginResponseDto kakaoLoginResponseDto = userService.kakaoLogin(kakaoToken);
        return new ResponseEntity<>(kakaoLoginResponseDto, HttpStatus.OK);
    }

    @ApiOperation(value = "로그아웃")
    @DeleteMapping("/logout")
    public ResponseEntity<String> Logout(@RequestBody KakaoLogoutDto kakaoLogoutDto){
        String refreshToken = kakaoLogoutDto.getRefreshToken();
        Boolean result = userService.kakaoLogout(refreshToken);

        if (result == true) {
            return new ResponseEntity<>("로그아웃 성공",HttpStatus.OK);
        } else {
            return new ResponseEntity<>("로그아웃 실패",HttpStatus.BAD_REQUEST);
        }
    }
}
