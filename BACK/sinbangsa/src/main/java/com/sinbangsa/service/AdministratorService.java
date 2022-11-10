package com.sinbangsa.service;

import com.sinbangsa.data.dto.*;
import com.sinbangsa.data.entity.ThemeTime;

import java.util.List;

public interface AdministratorService {
    List<AdminStoreDto> getAdminStoreDetail(long adminId);
    Boolean registerStoreDetail(StoreRegisterDto storeRegisterDto, long adminId);
    Boolean updateStoreDetail(AdminStoreDto adminStoreDto, long adminId);
    List<ThemeListDto> getThemeList(long storeId, long adminId);
    AdministratorThemeDetailDto getThemeDetail(long themeId, long adminId);
    Boolean registerThemeThemeTime(ThemeRegisterDto themeRegisterDto, long adminId);
    Long registerTheme(ThemeRegisterDto themeRegister);
    Boolean registerThemeTime(List<String> themeTimes, long createdThemeId);
    Boolean updateThemeThemeTime(ThemeUpdateDto themeUpdateDto, long adminId);
    Boolean createThemeTime(long themeId, String themeTime, long adminId);
    Boolean updateThemeTime(ThemeTimeDto themeTime, long adminId);
    Boolean deleteThemeTime(long themeTimeId, long adminId);

}
