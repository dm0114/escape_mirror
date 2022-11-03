//package com.sinbangsa.controller;
//
//import com.sinbangsa.data.entity.User;
//import com.sinbangsa.data.repository.UserRepository;
//import com.sinbangsa.utils.JwtTokenProvider;
//import lombok.RequiredArgsConstructor;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequiredArgsConstructor
//@RequestMapping("/api/jwt")
//public class JwtTestController {
//
//    private final UserRepository userRepository;
//
//    private final JwtTokenProvider jwtTokenProvider;
//
//    @ResponseBody
//    @GetMapping("/test")
//    private String jwtTest(@RequestParam String email){
//        System.out.println("1");
//        String token = jwtTokenProvider.createAccessToken(email);
//        return token;
//    }
//}
