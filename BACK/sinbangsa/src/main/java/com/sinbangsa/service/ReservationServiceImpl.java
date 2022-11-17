package com.sinbangsa.service;


import com.sinbangsa.data.dto.ReservationDto;
import com.sinbangsa.data.dto.ThemeTimeDto;
import com.sinbangsa.data.entity.Reservation;
import com.sinbangsa.data.entity.ThemeTime;
import com.sinbangsa.data.entity.User;
import com.sinbangsa.data.repository.ReservationRepository;
import com.sinbangsa.data.repository.ThemeTimeRepository;
import com.sinbangsa.data.repository.UserRepository;
import com.sinbangsa.exception.AccessDeniedException;
import com.sinbangsa.exception.ReservationNotFound;
import com.sinbangsa.utils.JwtTokenProvider;
import com.sinbangsa.exception.ThemeTimeNotFoundException;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@Service
@RequiredArgsConstructor
public class ReservationServiceImpl implements ReservationService {

    private final Logger LOGGER = LoggerFactory.getLogger(ReservationServiceImpl.class);
    private final ReservationRepository reservationRepository;

    private final ThemeTimeRepository themeTimeRepository;

    private final UserRepository userRepository;

    private final JwtTokenProvider jwtTokenProvider;

    private static final Long VALIDATE_FAIL = (long) 0;


    public Long createReservation(ReservationDto reservationDto, HttpServletRequest httpServletRequest) {
        LOGGER.info("[ReservationServiceImpl] createReservation 호출");

        try {

            String token = jwtTokenProvider.resolveToken(httpServletRequest);
            Long userId = jwtTokenProvider.getUserId(token);
            User userRepo = userRepository.findById(userId).orElse(null);
            if (userRepo == null) {
                throw new NullPointerException("유저 정보가 잘못되었습니다.");
            }
            ThemeTime reservationTime = themeTimeRepository.findById(reservationDto.getThemeTimeId()).orElse(null);
            if (reservationTime == null) {
                throw new ThemeTimeNotFoundException();
            }
            // 기존 예약 내역에 이미 데이터가 있는지 확인
            if (!reservationRepository.existsByThemeTimeIdAndDate(
                    reservationDto.getThemeTimeId(), reservationDto.getReservationDate())) {
                Reservation reservation = Reservation.builder()
                        .reservationUser(userRepo)
                        .date(reservationDto.getReservationDate())
                        .themeTime(reservationTime)
                        .accept(false)
                        .status(0)
                        .build();

                Long reservationId = reservationRepository.save(reservation).getReservationId();

                return reservationId;
            } else {
                throw new NullPointerException();
            }

        } catch (Exception e) {
            throw e;
        }

    }

    @Transactional(readOnly = true)
    public List<ThemeTimeDto> getThemeTime(long themeId) {
        LOGGER.info("[ReservationService] getThemeTime 호출");
        List<ThemeTimeDto> themeTimes = new ArrayList<>();

        try {
            List<ThemeTime> themeTimerepos = themeTimeRepository.findAllByThemeId((themeId));
            if (themeTimerepos.isEmpty()) {
                throw new NullPointerException("잘못된 themeId 요청");
            }
            for (ThemeTime them : themeTimerepos) {
                ThemeTimeDto themeTimeDto = new ThemeTimeDto();

                themeTimeDto.setTime(them.getTime());
                themeTimeDto.setThemeTimeId(them.getId());

                themeTimes.add(themeTimeDto);
            }
            return themeTimes;
        } catch (Exception e) {
            throw e;
        }
    }

    @Transactional(readOnly = true)
    public List<Long> canReserve(long themeId, String date) {
        LOGGER.info("[ReservationService] canReserve 호출");
        List<Long> themeTimeIdList = new ArrayList<>();

        try {
            LocalDate today = LocalDate.now();
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
            java.util.Date inputToday = simpleDateFormat.parse(date);

            Date todayDate = java.sql.Date.valueOf(today);
            long timeDifference = todayDate.getTime() - inputToday.getTime();

            long dayDifference = (timeDifference / (1000L * 60 * 60 * 24)) % 365;
            if (dayDifference >= 7) {
                throw new Exception("예약 날짜 데이터가 잘못되었습니다.(오늘보다 7일이 넘는 날짜 예약 불가)");
            }
            // 테마 예약시간
            List<ThemeTime> themeTimes = themeTimeRepository.findAllByThemeId(themeId);
            if (themeTimes.isEmpty()) {
                throw new NullPointerException("요청테마가 잘못되었습니다.");
            }
            if (themeTimes.isEmpty()) {
                throw new NullPointerException("잘못된 themeId 요청");
            }

            for (ThemeTime themeTime : themeTimes) {
                System.out.println(themeTime);
                if (!reservationRepository.existsByThemeTimeAndDate(themeTime, date)) {
                    System.out.println(1);
                    themeTimeIdList.add(themeTime.getId());
                }
            }
            return themeTimeIdList;
        } catch (Exception e) {
            throw new RuntimeException();
        }



    }

    @Transactional(readOnly = true)
    public Long validateNickname(String nickname) {
        LOGGER.info("[ReservationService] validateNickname 호출");


        try {
            if (userRepository.existsByNickname(nickname)) {
                User userRepo = userRepository.findByNickname(nickname).orElse(null);
                if (userRepo == null) {
                    throw new NullPointerException("유저 정보가 잘못되었습니다.");
                }
                Long userId = userRepo.getId();
                return userId;
            }
        } catch (Exception e) {
            throw e;
        }
        return VALIDATE_FAIL;

    }

    public Boolean deleteReservation(long reservationId,HttpServletRequest httpServletRequest){
        String token = jwtTokenProvider.resolveToken(httpServletRequest);
        Long userId = jwtTokenProvider.getUserId(token);

        Reservation reservation = reservationRepository.findById(reservationId).orElse(null);

        try {
            if (reservation == null) {
                throw new ReservationNotFound();
            }

            if (userId != reservation.getReservationUser().getId()) {
                throw new AccessDeniedException();
            }
            reservationRepository.delete(reservation);
            return true;
        }catch (Exception e) {
            return false;
        }


    }
}
