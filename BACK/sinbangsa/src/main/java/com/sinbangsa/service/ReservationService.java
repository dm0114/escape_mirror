package com.sinbangsa.service;


import com.sinbangsa.data.dto.ReservationDto;

public interface ReservationService {

    boolean createReservation(ReservationDto reservationDto);
}
