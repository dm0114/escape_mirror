package com.sinbangsa.data.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ReviewUpdateDto {
    private String reviewImg;
    private int star;
    private int feelDifficulty;
    private int feelStory;
    private int feelInterrior;
    private int feelActivity;
    private int feelHorror;
    private int locker;
    private String content;
}
