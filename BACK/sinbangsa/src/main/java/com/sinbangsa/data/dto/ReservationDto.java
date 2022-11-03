package com.sinbangsa.data.dto;


import lombok.*;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ReservationDto {

    private long themeId;

    private Date reservationDate;

    private long themeTimeId;


}
