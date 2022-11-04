package com.sinbangsa.service;


import com.sinbangsa.data.dto.ReservationDto;
import com.sinbangsa.data.dto.ThemeTimeDto;
import com.sinbangsa.data.entity.Reservation;
import com.sinbangsa.data.entity.ThemeTime;
import com.sinbangsa.data.entity.User;
import com.sinbangsa.data.repository.ReservationRepository;
import com.sinbangsa.data.repository.ThemeRepository;
import com.sinbangsa.data.repository.ThemeTimeRepository;
import com.sinbangsa.data.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;


@Service
@RequiredArgsConstructor
public class ReservationServiceImpl implements ReservationService {

    private final Logger LOGGER = LoggerFactory.getLogger(UserServiceImpl.class);
    private final ReservationRepository reservationRepository;

    private final ThemeTimeRepository themeTimeRepository;

    private final UserRepository userRepository;

    @Transactional
    public boolean createReservation(ReservationDto reservationDto) {

        Reservation reservation = new Reservation();

        try {
            reservation.setDate(reservationDto.getReservationDate());
            reservation.setThemeTime(themeTimeRepository
                    .findById(reservationDto.getThemeTimeId()));

            // 기존 예약 내역에 이미 데이터가 있는지 확인
            if (!reservationRepository.existsByThemeTimeIdAndDate(
                    reservationDto.getThemeTimeId(), reservationDto.getReservationDate())) {
                reservationRepository.save(reservation);

            } else {
                return false;
            }

        } catch (Exception e) {
            return false;
        }
        return true;

    }

    @Transactional(readOnly = true)
    public List<ThemeTimeDto> getThemeTime(long themeId) {
        LOGGER.info("[ReservationService] getThemeTime 호출");
        List<ThemeTimeDto> themeTimes = new ArrayList<>();

        List<ThemeTime> themeTimerepos = themeTimeRepository.findAllByThemeId((themeId));

        for (ThemeTime them : themeTimerepos) {
            ThemeTimeDto themeTimeDto = new ThemeTimeDto();

            themeTimeDto.setTime(them.getTime());
            themeTimeDto.setThemeTimeId(them.getId());

            themeTimes.add(themeTimeDto);
        }
        return themeTimes;

    }

    @Transactional(readOnly = true)
    public List<Long> canReserve(long themeId, String date) {
        LOGGER.info("[ReservationService] canReserve 호출");
        List<Long> themeTimeIdList = new ArrayList<>();


        // 테마 예약시간
        List<ThemeTime> themeTimes = themeTimeRepository.findAllByThemeId(themeId);

        for (ThemeTime them : themeTimes) {
            long themeTimeId = them.getId();

            // 예약된 내역
            List<Reservation> reservedList = reservationRepository.findAllByThemeTimeIdAndDate(themeTimeId, date);
            boolean flag = true;
            for (Reservation reserved : reservedList) {
                if (reserved.getThemeTime().getId() == themeTimeId) {
                    flag = false;
                }
            }
            if (flag) {
                themeTimeIdList.add(them.getId());
            }
        }
        return themeTimeIdList;


    }

    @Transactional(readOnly = true)
    public Long validateNickname(String nickname) {
        LOGGER.info("[ReservationService] validateNickname 호출");
        Long userId = (long) 0;

        if (userRepository.existsByNickname(nickname)) {
            userId = userRepository.findByNickname(nickname).getId();
        }
        return userId;




    }
}
