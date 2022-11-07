package com.sinbangsa.data.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class BookDto {

    private long storeId;

    private String storeImg;

    private String storeName;

    private boolean isClear;

}
