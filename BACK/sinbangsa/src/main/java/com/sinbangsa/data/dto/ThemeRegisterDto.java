package com.sinbangsa.data.dto;

import com.sinbangsa.data.entity.Reservation;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ThemeRegisterDto {
    private long storeId;
    private String themeTitle;
    private String genre;
    private String content;
    private int leadtime;
    private int difficulty;
    private String capacity;
    private String price;
    private List<String> reservationtime;
    private String themeImg;

}
