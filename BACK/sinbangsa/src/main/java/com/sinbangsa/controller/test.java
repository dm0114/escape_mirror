package com.sinbangsa.controller;

import com.sinbangsa.data.entity.User;
import com.sinbangsa.data.repository.UserRepository;
import com.sinbangsa.utils.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class test {

    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;

    @GetMapping("/testjwt")
    @ResponseBody
    public String jwt(@RequestParam String email){
        User user = userRepository.getByEmail(email);

        String token = jwtTokenProvider.createToken(user.getEmail());

        return token;
    }
}
