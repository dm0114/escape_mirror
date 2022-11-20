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
public class StoreDetailDto {

    private String storeName;

    private String storeAddress;

    private String mapX;

    private String mapY;

    private String tel;

    private String storeImg;

    private String homepage;

    private String region;

    private int clearCnt;

    private int totalTheme;

    private List<ThemeDetailDto> themeList;


}
