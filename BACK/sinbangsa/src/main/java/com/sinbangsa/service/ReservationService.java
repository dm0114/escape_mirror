package com.sinbangsa.service;


import com.sinbangsa.data.dto.ReservationDto;
import com.sinbangsa.data.dto.ThemeTimeDto;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

public interface ReservationService {

    Long createReservation(ReservationDto reservationDto, HttpServletRequest httpServletRequest);

    List<ThemeTimeDto> getThemeTime(long themeId);

    List<Long> canReserve(long themeId, String date);

    Long validateNickname(String nickname);
    Boolean deleteReservation(long reservationId,HttpServletRequest httpServletRequest);
}
