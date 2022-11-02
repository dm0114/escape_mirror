package com.sinbangsa.service;


import com.sinbangsa.config.SHA256;
import com.sinbangsa.data.dto.UserDto;
import com.sinbangsa.data.entity.User;
import com.sinbangsa.data.repository.UserRepository;
import com.sun.org.slf4j.internal.LoggerFactory;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.NoSuchAlgorithmException;
import java.util.List;

@Service
@Transactional(readOnly = true)
public class UserService implements IUserService{

    private final Logger LOGGER = (Logger) LoggerFactory.getLogger(UserService.class);
    private final UserRepository userRepository;


    @Autowired
    public UserService(UserRepository userRepository) {

        this.userRepository = userRepository;

    }

    // 회원 가입
    @Transactional
    public boolean join(UserDto userDto) {
        LOGGER.debug("회원가입 정보 전달 완료");
        try {
            SHA256 sha256 = new SHA256();
            User user = new User();

            user.setUsername(userDto.getUsername());
            user.setUsername(userDto.getNickname());
            user.setPassword(sha256.encrypt(userDto.getPassword()));
            user.setEmail(userDto.getEmail());
            user.setTel(userDto.getTel());
            user.setBirth(userDto.getBirth());
            user.setProfile(userDto.getProfileImg());
            user.setEmail(userDto.getEmail());

            User savedUser = userRepository.save(user);
            return true;
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }

    }



    public User login(UserDto loginUser) throws RuntimeException, NoSuchAlgorithmException {
        LOGGER.debug("[getLoginResult] 회원 정보 요청 ");

        User user = userRepository.getByEmail(loginUser.getEmail());
        LOGGER.debug("[getLoginResult] Id : {} ", loginUser.getEmail());

        LOGGER.debug("[getLoginResult] 패스워드 비교 수행");
        SHA256 sha256 = new SHA256();
        // 비밀번호 일치 확인
        if (sha256.encrypt(loginUser.getPassword()).equals(user.getPassword())) {
            throw new RuntimeException();
        }
        LOGGER.debug("[getLoginResult] 패스워드 일치 확인");
        return user;
    }





}
