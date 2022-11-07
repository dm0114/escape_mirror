package com.sinbangsa.data.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class MainpageDto {

    @Getter
    @Setter
    public static class MostReviewedThemeDto{
        long themeId;
        String themeName;
        String themeImg;
        double star;
    }

    @Getter
    @Setter
    public static class LStoreDto {
        long storeId;
        String storeName;
        String storeImg;
        String storeAddress;
        int likeCount;
        MostReviewedThemeDto mostReviewedTheme;
    }

    @Getter
    @Setter
    public static class LThemeDto{
        long themeId;
        String themeName;
        String storeName;
        String themeImg;
        int likeCount;
        double star;
        String randomReview;
    }



    List<LStoreDto> storeList;
    List<LThemeDto> themelist;

}

