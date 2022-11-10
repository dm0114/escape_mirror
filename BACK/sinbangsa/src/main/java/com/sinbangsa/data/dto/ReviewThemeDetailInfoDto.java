package com.sinbangsa.data.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class ReviewThemeDetailInfoDto {

    private long reviewId;

    private String userName;

    private String content;

    private int star;

    private String reviewImg;

    private LocalDateTime createdAt;

    private LocalDate clearDate;

    private int usedHint;

    private String clearTime;



}
