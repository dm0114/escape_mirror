package com.sinbangsa.controller;


import com.sinbangsa.data.dto.KakaoLoginRequestDto;
import com.sinbangsa.data.dto.KakaoLoginResponseDto;
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

//    @ResponseBody
//    @GetMapping("/kakao")
//    public void kakaoCode(@RequestParam String code){
//        System.out.println(code);
//    }


    @ApiOperation(value = "카카오 회원관리")
    @PostMapping("/kakao")
    public ResponseEntity<KakaoLoginResponseDto> kakao(@RequestBody KakaoLoginRequestDto kakaoLoginRequestDto){
        System.out.println("123");
        String kakaoToken = kakaoLoginRequestDto.getAccessToken();
        User loginUser = userService.getUserinfoByToken(kakaoToken);
        String userEmail = loginUser.getEmail();
        String accessToken = jwtTokenProvider.createAccessToken(userEmail);
        String refreshToken = jwtTokenProvider.createRefreshToken(userEmail);
        KakaoLoginResponseDto kakaoLoginResponseDto = new KakaoLoginResponseDto();
        kakaoLoginResponseDto.setAccessToken(accessToken);
        kakaoLoginResponseDto.setRefreshToken(refreshToken);

        return new ResponseEntity<>(kakaoLoginResponseDto,HttpStatus.OK);

    }

    @GetMapping("/test")
    public void test(){
        jwtTokenProvider.

    }

    //회원가입
//    @ApiOperation(value = "유저 회원가입")
//    @PostMapping("/signup")
//    public ResponseEntity<Boolean> signupUser(@RequestBody UserDto userDto) {
//        LOGGER.debug("signup - 호출");
//        try {
//            userService.join(userDto);
//            return new ResponseEntity<>(true, HttpStatus.CREATED);
//
//        } catch (RuntimeException e) {
//            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
//        }
//
//
//    }

    //로그인
//    @PostMapping("/login")
//    public ResponseEntity<UserDto> login(@RequestBody UserDto userDto, HttpServletResponse response) {
//
//        try {
//            LOGGER.debug("[login] 로그인 시도 중", userDto.getEmail());
//
//            User loginUser = userService.login(userDto);
//        } catch (NoSuchAlgorithmException e) {
//            throw new RuntimeException(e);
//        }
//
//        return new ResponseEntity<>();
//
//    }
}
