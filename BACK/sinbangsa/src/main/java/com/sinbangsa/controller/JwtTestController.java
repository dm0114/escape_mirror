package com.sinbangsa.controller;

import com.sinbangsa.data.dto.KakaoLoginDto;
import com.sinbangsa.data.dto.KakaoTokenDto;
import com.sinbangsa.data.entity.User;
import com.sinbangsa.data.repository.UserRepository;
import com.sinbangsa.service.UserService;
import com.sinbangsa.utils.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/jwt")
public class JwtTestController {

    private final UserRepository userRepository;

    private final UserService userService;

    private final JwtTokenProvider jwtTokenProvider;

//    @ResponseBody
//    @GetMapping("/test")
//    private String jwtTest(@RequestParam String email){
//        System.out.println("1");
//        String token = jwtTokenProvider.createAccessToken(email);
//        return token;
//    }
//
//    @ResponseBody
//    @PostMapping("/signup")
//    public ResponseEntity<KakaoLoginDto> signup(@RequestBody String email){
//        String kakaoToken = kakao
//        System.out.println(kakaoToken);
//        return new ResponseEntity<>(null, HttpStatus.OK);
//    }
//}
}
