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
        private long themeId;
        private String themeName;
        private String themeImg;
        private double star;
    }

    @Getter
    @Setter
    public static class LStoreDto {
        private long storeId;
        private String storeName;
        private String storeImg;
        private String storeAddress;
        private int likeCount;
        private MostReviewedThemeDto mostReviewedTheme;
        private String tel;
        private String mapX;
        private String mapY;
        private String homepage;
    }

    @Getter
    @Setter
    public static class LThemeDto{
        private long themeId;
        private String themeName;
        private String storeName;
        private String themeImg;
        private int likeCount;
        private double star;
        private String randomReview;
        private String genre;
    }

    private List<LStoreDto> storeList;
    private int storeCount;
    private List<LThemeDto> themelist;
    private int themeCount;

}

