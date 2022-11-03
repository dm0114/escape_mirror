package com.sinbangsa.data.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class BookDto {

    long themeId;

    String reviewImg;

    int star;

    int feelDifficulty;

    int feelStory;

    int feelInterrior;

    int feelActivity;

    int feelHorror;

    int lock;

    String content;


}
