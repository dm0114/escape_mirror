package com.sinbangsa.service;

import com.sinbangsa.data.dto.AdminStoreDto;
import com.sinbangsa.data.dto.AdministratorThemeDetailDto;
import com.sinbangsa.data.dto.StoreRegesterDto;
import com.sinbangsa.data.dto.ThemeListDto;
import com.sinbangsa.data.entity.Admin;

import java.util.List;

public interface AdministratorService {
    List<AdminStoreDto> getAdminStoreDetail(long adminId);
    Boolean registerStoreDetail(StoreRegesterDto storeRegesterDto, long adminId);
    Boolean updateStoreDetail(AdminStoreDto adminStoreDto, long adminId);
    List<ThemeListDto> getThemeList(long storeId, long adminId);
    AdministratorThemeDetailDto getThemeDetail(long themeId, long adminId);
}
