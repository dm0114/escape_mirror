package com.sinbangsa.data.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PreLoadingDto {
    @Getter
    @Setter
    public static class ReservationDto{
        long reservationId;
        String themeName;
        String storeName;
        String reservationDate;
        String reservationTime;
    }
    List<ReservationDto> reservationList;
}
