package com.sinbangsa.data.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class TransferDto {

    private Long storeId;

    private String storeName;

    private Long themeId;

    private String themeName;

    private String reservedDate;

    private String reservedTime;

    private String reservedName;

}
