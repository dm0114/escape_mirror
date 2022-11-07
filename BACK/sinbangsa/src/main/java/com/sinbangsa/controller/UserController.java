package com.sinbangsa.controller;


import com.sinbangsa.data.dto.KakaoCodeDto;
import com.sinbangsa.data.dto.KakaoTokenDto;
import com.sinbangsa.data.entity.User;
import com.sinbangsa.service.UserService;
import com.sinbangsa.service.UserServiceImpl;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
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

    @ResponseBody
    @GetMapping("/kakao")
    public void kakaoCode(@RequestParam String code){
        System.out.println(code);
    }
    @ApiOperation(value = "카카오 회원관리")
    @PostMapping("/kakao/api")
    public ResponseEntity<String> kakao(@RequestBody KakaoCodeDto kakaocodedto){
        String code = kakaocodedto.getCode();
        System.out.println(code);
        KakaoTokenDto kakaoToken = userService.getAccessTokenByCode(code);
//        User user = userService.getProfile(kakaoToken);
        return new ResponseEntity<>(String.valueOf(kakaoToken),HttpStatus.OK);

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
