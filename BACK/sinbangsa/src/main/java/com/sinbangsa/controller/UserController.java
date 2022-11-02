package com.sinbangsa.controller;


import com.sinbangsa.data.dto.UserDto;
import com.sinbangsa.data.entity.User;
import com.sinbangsa.service.UserService;
import com.sun.org.slf4j.internal.Logger;
import com.sun.org.slf4j.internal.LoggerFactory;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.security.NoSuchAlgorithmException;

@Api(value = "유저 API", tags = {"유저 API"})
@RestController
@RequestMapping("/user")
public class UserController {

    private final Logger LOGGER = LoggerFactory.getLogger(UserService.class);

    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @Autowired
    UserService userService;

    //회원가입
    @ApiOperation(value = "유저 회원가입")
    @PostMapping("/signup")
    public ResponseEntity<String> signupUser(@RequestBody UserDto userDto) {
        LOGGER.debug("signup - 호출");
        try {
            userService.join(userDto);
            return new ResponseEntity<>(SUCCESS, HttpStatus.CREATED);

        } catch (RuntimeException e) {
            return new ResponseEntity<>(FAIL, HttpStatus.BAD_REQUEST);
        }


    }

    //로그인
    @PostMapping("/login")
    public ResponseEntity<UserDto> login(@RequestBody UserDto userDto, HttpServletResponse response) {

        try {
            LOGGER.debug("[login] 로그인 시도 중", userDto.getEmail());

            User loginUser = userService.login(userDto);
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }

        return new ResponseEntity<>();

    }
}
