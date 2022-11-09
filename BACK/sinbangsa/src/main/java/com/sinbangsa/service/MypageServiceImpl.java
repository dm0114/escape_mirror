package com.sinbangsa.service;


import com.sinbangsa.data.dto.MypageInfoDto;
import com.sinbangsa.data.entity.User;
import com.sinbangsa.data.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MypageServiceImpl implements MypageService {

    private final Logger LOGGER = LoggerFactory.getLogger(MypageServiceImpl.class);

    private final UserRepository userRepository;

    public MypageInfoDto getMyPageInfo() {
        LOGGER.info("[MyPageServiceImpl] getMyPageInfo 호출");

        MypageInfoDto mypageInfoDto = new MypageInfoDto();

        //임시
        long userId = (long) 1;
        User userRepo = userRepository.findById(userId);

        mypageInfoDto.setNickname(userRepo.getNickname());
        mypageInfoDto.setGrade(userRepo.getGrade());
        mypageInfoDto.setProfileImg(userRepo.getProfile());

        return mypageInfoDto;
    }

}
