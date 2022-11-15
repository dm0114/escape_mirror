package com.sinbangsa.service;

import com.sinbangsa.data.dto.AdminLoginRequestDto;
import com.sinbangsa.data.dto.AdminLoginResponseDto;
import com.sinbangsa.data.dto.AdminSignupDto;

public interface AdminService {
    String AdminSignup(AdminSignupDto adminSignupDto);
    AdminLoginResponseDto AdminLogin(AdminLoginRequestDto adminLoginDto);

    String AdminLogout(String refreshToken);
}
