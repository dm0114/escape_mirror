package com.sinbangsa.data.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

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

    private LocalDate createdAt;

    private LocalDateTime clearDate;

    private int usedHint;

    private String clearTime;


}
