package com.sinbangsa.data.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AdminStoreDto {
    private String storeImg;
    private String address;
    private String region;
    private String description;
    private String tel;
    private String homepage;

}
