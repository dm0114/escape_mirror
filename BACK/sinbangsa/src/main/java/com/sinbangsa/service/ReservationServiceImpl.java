package com.sinbangsa.service;


import com.sinbangsa.data.dto.ReservationDto;
import com.sinbangsa.data.entity.Reservation;
import com.sinbangsa.data.repository.ReservationRepository;
import com.sinbangsa.data.repository.ThemeTimeRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;



@Service
@RequiredArgsConstructor
public class ReservationServiceImpl implements ReservationService {

    private final Logger LOGGER = LoggerFactory.getLogger(UserServiceImpl.class);
    private final ReservationRepository reservationRepository;

    private final ThemeTimeRepository themeTimeRepository;

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
}
