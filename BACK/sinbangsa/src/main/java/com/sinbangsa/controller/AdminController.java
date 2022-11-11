package com.sinbangsa.controller;

import com.sinbangsa.data.dto.AdminSignupDto;
import com.sinbangsa.service.AdminService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.models.Response;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
