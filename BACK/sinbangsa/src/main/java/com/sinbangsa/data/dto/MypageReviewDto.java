package com.sinbangsa.data.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class MypageReviewDto {

    private long reviewId;

    private String themeTitle;

    private String content;

    private int star;

    private int diff;

    private int story;

    private int interior;

    private int horror;

    private int lock;

    private String reviewImg;

    private int reviewCount;

}


