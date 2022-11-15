package com.sinbangsa.service;


import com.sinbangsa.data.dto.AdminLoginRequestDto;
import com.sinbangsa.data.dto.AdminLoginResponseDto;
import com.sinbangsa.data.dto.AdminSignupDto;
import com.sinbangsa.data.entity.RefreshToken;
import com.sinbangsa.data.entity.User;
import com.sinbangsa.data.repository.RefreshTokenRepository;
import com.sinbangsa.data.repository.UserRepository;
import com.sinbangsa.utils.JwtTokenProvider;
import com.sinbangsa.utils.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService{

    private final UserRepository userRepository;

    private final JwtTokenProvider jwtTokenProvider;

    private final RefreshTokenRepository refreshTokenRepository;

    private final PasswordEncoder passwordEncoder;

    public String AdminSignup(AdminSignupDto adminSignupDto){

        if (adminSignupDto.getAdminName()==null||
            adminSignupDto.getPassword()==null||
            adminSignupDto.getUserId()==null){

            throw new IllegalArgumentException("비어있는 데이터가 존재합니다.");
        }

        String encPassword = passwordEncoder.encode(adminSignupDto.getPassword());

        User admin = User.builder().email(adminSignupDto.getUserId())
                .nickname(adminSignupDto.getAdminName())
                .password(encPassword)
                .roles(Collections.singletonList(Role.ADMIN))
                .build();

        userRepository.save(admin);

        return "어드민 어드밋";
    }

    public AdminLoginResponseDto AdminLogin(AdminLoginRequestDto adminLoginDto){
        User admin = userRepository.getByEmail(adminLoginDto.getUserId()).orElse(null);
        if (admin == null){
            return null;
        }
        if (!passwordEncoder.matches(adminLoginDto.getPassword(), admin.getPassword())){
            return null;
        }

        String accessToken = jwtTokenProvider.createAccessToken(admin.getEmail(),admin.getId(),admin.getRoles());
        String refreshToken = jwtTokenProvider.createRefreshToken(admin.getEmail(),admin.getId(),admin.getRoles());

        AdminLoginResponseDto adminLoginResponseDto = new AdminLoginResponseDto();
        adminLoginResponseDto.setAccessToken(accessToken);
        adminLoginResponseDto.setRefreshToken(refreshToken);
        return adminLoginResponseDto;

    }

    public String AdminLogout(String refreshToken) {
        RefreshToken ref = refreshTokenRepository.findRefreshTokenByRefreshToken(refreshToken).orElse(null);
        refreshTokenRepository.delete(ref);
        return "삭제완료";
    }
}
