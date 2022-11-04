package com.sinbangsa.service;


import com.sinbangsa.data.dto.ReservationDto;
import com.sinbangsa.data.dto.ThemeTimeDto;

import java.util.List;

public interface ReservationService {

    boolean createReservation(ReservationDto reservationDto);

    List<ThemeTimeDto> getThemeTime(long themeId);
}
