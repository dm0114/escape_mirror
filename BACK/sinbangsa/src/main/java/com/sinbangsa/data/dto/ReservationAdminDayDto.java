package com.sinbangsa.data.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ReservationAdminDayDto {
    private String storeName;
    private List<ThemeReservationDto> themeReservationList;

    @Getter
    @Setter
    public static class TimeReservationDto {
        private String reservationTime;
        private long reservationTimeId;
        private String userName;
        private int status;
        private boolean accept;
    }
    @Getter
    @Setter
    public static class ThemeReservationDto {
        private long themeId;
        private String themeName;
        private List<TimeReservationDto> timeReservationDto;
    }
}
