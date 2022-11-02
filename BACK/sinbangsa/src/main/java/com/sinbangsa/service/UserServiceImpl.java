package com.sinbangsa.service;


import com.sinbangsa.config.SHA256;
import com.sinbangsa.data.dto.UserDto;
import com.sinbangsa.data.entity.User;
import com.sinbangsa.data.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.NoSuchAlgorithmException;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final Logger LOGGER = LoggerFactory.getLogger(UserServiceImpl.class);
    private final UserRepository userRepository;




    @Transactional
    public boolean join(UserDto userDto) {
        SHA256 sha256 = new SHA256();
        User user = new User();

        try {
            user.setUsername(userDto.getUsername());
            user.setNickname(userDto.getNickname());
            user.setPassword(sha256.encrypt(userDto.getPassword()));
            user.setEmail(userDto.getEmail());
            user.setTel(userDto.getTel());
            user.setBirth(userDto.getBirth());

            userRepository.save(user);
            return true;
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }

}
