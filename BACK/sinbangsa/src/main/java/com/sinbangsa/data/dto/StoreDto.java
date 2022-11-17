package com.sinbangsa.data.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class StoreDto {

    private long storeId;

    private String storeImg;

    private String storeName;

    private int clearCnt;

    private int totalTheme;

    private int storeCount;

}
