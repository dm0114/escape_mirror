package com.sinbangsa.data.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class MypageLikeDto {

    private long themeId;

    private String storeName;

    private String themeName;

    private String themeImg;

    private int themeCount;
}
