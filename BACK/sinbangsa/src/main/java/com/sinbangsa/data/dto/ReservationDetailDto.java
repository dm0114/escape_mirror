package com.sinbangsa.data.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ReservationDetailDto {

    private String storeAddress;

    private String themeName;

    private String storeName;

    private String date;

    private String time;

    private String tel;

    private String homepage;

    private String mapY;

    private String mapX;

    private String themeImg;

}
