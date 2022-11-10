package com.sinbangsa.data.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class StoreRegisterDto {

    private String storeName;
    private String storeImg;
    private String Address;
    private String region;
    private String tel;
    private String homepage;

}
