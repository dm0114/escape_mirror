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
public class ThemeDetailInfoDto {

    private String themeName;

    private String genre;

    private String capacity;

    private String price;

    private int difficulty;

    private int leadTime;

    private String description;

    private String themeImg;

    private int star;

    private int feelDifficulty;

    private int feelStory;

    private int feelInterior;

    private int feelActivity;

    private int feelHorror;

    private int lock;

    private List<ThemeDetailInfoDto> reviews;

    private List<UserOfRankDto> noHintRanking;

    private List<UserOfRankDto> hintRanking;


}
