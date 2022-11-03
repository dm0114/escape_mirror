package com.sinbangsa.service;


import com.sinbangsa.data.dto.ReservationDto;
import com.sinbangsa.data.entity.Reservation;
import com.sinbangsa.data.repository.ReservationRepository;
import com.sinbangsa.data.repository.ThemeTimeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class ReservationServiceImpl implements ReservationService {

    private final ReservationRepository reservationRepository;

    private final ThemeTimeRepository themeTimeRepository;

    @Transactional
    public void makeReservation(ReservationDto reservationDto) {

        Reservation reservation = new Reservation();

        try {
            reservation.setDate(reservationDto.getReservationDate());
            reservation.setThemeTime(themeTimeRepository
                    .findById(reservationDto.getThemeTimeId()));

            if (!reservationRepository.existsByThemeTimeIdAndDate(
                    reservationDto.getThemeTimeId(), reservationDto.getReservationDate())) {
                reservationRepository.save(reservation);
            } else {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "이미 존재하는 예약");
            }

        } catch (ResponseStatusException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "예약 실패");
        }




    }
}
