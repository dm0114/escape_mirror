package com.sinbangsa.data.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ThemeForThemeListDto {

    private long themeId;

    private String themeImg;

    private String themeName;

    private int isClear;

}
