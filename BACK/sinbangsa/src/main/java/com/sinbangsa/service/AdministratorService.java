package com.sinbangsa.service;

import com.sinbangsa.data.dto.*;

import java.util.List;

public interface AdministratorService {
    List<AdminStoreDto> getAdminStoreDetail(long adminId);
    Boolean registerStoreDetail(StoreRegisterDto storeRegisterDto, long adminId);
    Boolean updateStoreDetail(AdminStoreDto adminStoreDto, long adminId);
    List<ThemeListDto> getThemeList(long storeId, long adminId);
    AdministratorThemeDetailDto getThemeDetail(long themeId, long adminId);
    Long registerTheme(ThemeRegisterDto themeRegister, long adminId);
    Boolean registerThemeTime(ThemeRegisterDto themeRegister, long createdThemeId);
}
