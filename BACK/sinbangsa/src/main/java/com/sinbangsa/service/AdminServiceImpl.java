package com.sinbangsa.service;

import com.sinbangsa.data.dto.AdminSignupDto;
import com.sinbangsa.data.entity.Admin;
import com.sinbangsa.data.repository.AdministratorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService{

    private final AdministratorRepository administratorRepository;

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
}
