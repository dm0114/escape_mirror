package com.sinbangsa.data.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ReviewDto {

    long bookId;

    long themeId;

    String reviewImg;

    int star;

    int feelDifficulty;

    int feelStory;

    int feelInterrior;

    int feelActivity;

    int feelHorror;

    int locker;

    String content;


}
