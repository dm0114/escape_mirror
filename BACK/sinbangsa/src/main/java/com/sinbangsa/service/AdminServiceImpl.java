package com.sinbangsa.service;

import com.sinbangsa.data.dto.AdminLoginRequestDto;
import com.sinbangsa.data.dto.AdminLoginResponseDto;
import com.sinbangsa.data.dto.AdminSignupDto;
import com.sinbangsa.data.entity.Admin;
import com.sinbangsa.data.repository.AdministratorRepository;
import com.sinbangsa.utils.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService{

    private final AdministratorRepository administratorRepository;

    private final JwtTokenProvider jwtTokenProvider;

    private final PasswordEncoder passwordEncoder;

    public String AdminSignup(AdminSignupDto adminSignupDto){

        if (adminSignupDto.getAdminName()==null||
            adminSignupDto.getPassword()==null||
            adminSignupDto.getUserId()==null){

            throw new IllegalArgumentException("비어있는 데이터가 존재합니다.");
        }

        String encPassword = passwordEncoder.encode(adminSignupDto.getPassword());

        Admin admin = Admin.builder()
                .adminName(adminSignupDto.getAdminName())
                .userId(adminSignupDto.getUserId())
                .password(encPassword)
                .build();

        administratorRepository.save(admin);

        return "어드민 어드밋";
    }

    public AdminLoginResponseDto AdminLogin(AdminLoginRequestDto adminLoginDto){
        Admin admin = administratorRepository.getAdminByUserId(adminLoginDto.getUserId()).orElse(null);
        System.out.println(adminLoginDto.getUserId());
        System.out.println(admin);
        if (admin == null){
            return null;
        }
        if (!passwordEncoder.matches(adminLoginDto.getPassword(), admin.getPassword())){
            System.out.println(admin.getPassword());
            return null;
        }

        String accessToken = jwtTokenProvider.createAccessToken(adminLoginDto.getUserId(),admin.getId());
        String refreshToken = jwtTokenProvider.createRefreshToken(adminLoginDto.getUserId(),admin.getId());

        AdminLoginResponseDto adminLoginResponseDto = new AdminLoginResponseDto();
        adminLoginResponseDto.setAccessToken(accessToken);
        adminLoginResponseDto.setRefreshToken(refreshToken);
        return adminLoginResponseDto;


    }
}
