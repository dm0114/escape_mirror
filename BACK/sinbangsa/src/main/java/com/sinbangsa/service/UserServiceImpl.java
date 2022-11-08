package com.sinbangsa.service;


import config.SHA256;
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
            user.setEmail(userDto.getEmail());


            userRepository.save(user);
            return true;
        } catch (Exception e) {
            throw new RuntimeException();
        }
    }

}
