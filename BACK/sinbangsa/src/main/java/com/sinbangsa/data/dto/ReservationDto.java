package com.sinbangsa.data.dto;


import lombok.*;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ReservationDto {

    private long themeId;

    private String reservationDate;

    private long themeTimeId;


}
