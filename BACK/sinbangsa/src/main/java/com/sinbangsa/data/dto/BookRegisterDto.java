package com.sinbangsa.data.dto;

import com.sinbangsa.data.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class BookRegisterDto {
    private long reservationId;
    private List<String> userNicknames;
    private long themeId;
    private int clear;
    private int usedHint;
    private String clearTime;
}
