package com.sinbangsa.controller;

import com.sinbangsa.data.dto.AdminLoginRequestDto;
import com.sinbangsa.data.dto.AdminLoginResponseDto;
import com.sinbangsa.data.dto.AdminSignupDto;
import com.sinbangsa.data.dto.KakaoLogoutDto;
//import com.sinbangsa.service.AdminService;
import com.sinbangsa.service.AdminService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.models.Response;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Api(value = "관리자 회원관리",tags = {"관리자 회원관리"})
@RequestMapping("/api/admin/auth")
public class AdminController {

    private final Logger LOGGER = LoggerFactory.getLogger(AdminController.class);

    private final AdminService adminService;


    @ApiOperation(value = "관리자 회원가입")
    @PostMapping("/signup")
    public ResponseEntity<String> AdminSignup(@RequestBody AdminSignupDto adminSignupDto) {
        try {
            String result = adminService.AdminSignup(adminSignupDto);
            return new ResponseEntity<>(result, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("회원가입 실패", HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(value = "관리자 로그인")
    @PostMapping("/login")
    public ResponseEntity<AdminLoginResponseDto> AdminLogin(@RequestBody AdminLoginRequestDto adminLoginDto) {
        AdminLoginResponseDto result = adminService.AdminLogin(adminLoginDto);
        if (result == null) {
            System.out.println("로그인 실패");
            return new ResponseEntity<>(result,HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(result,HttpStatus.OK);
    }

    @ApiOperation(value = "어드민 로그아웃")
    @DeleteMapping("/logout")
    public ResponseEntity<String> AdminLogout(@RequestBody KakaoLogoutDto logoutDto){
        String refreshToken = logoutDto.getRefreshToken();
        String result = adminService.AdminLogout(refreshToken);
        return null;
    }


}
