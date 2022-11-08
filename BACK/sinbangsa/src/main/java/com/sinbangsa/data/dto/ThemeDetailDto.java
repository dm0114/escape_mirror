package com.sinbangsa.data.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class ThemeDetailDto {

    private long themeId;

    private String themeName;

    private String storeName;

    private String themeImg;

    private int likeCount;

    private int star;


}
