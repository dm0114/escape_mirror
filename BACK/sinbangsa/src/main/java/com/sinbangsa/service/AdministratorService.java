package com.sinbangsa.service;

import com.sinbangsa.data.dto.*;
import com.sinbangsa.data.entity.ThemeTime;
import com.sun.org.apache.xpath.internal.operations.Bool;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Date;
import java.util.List;
import java.util.Optional;

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
    Boolean deleteTheme(long themeId, long adminId);
    List<ReservationCountDto> getReservationCount(long adminId, long storeId);
    ReservationAdminDayDto getReservationAdminDay(long storeId, String reservationDay, long adminId);
    Boolean approveReservation(long adminId, long reservationId);
    Boolean deleteReservation(long reservationId, long adminId);
    Boolean verificationExit(BookRegisterDto bookRegister,long adminId);
}
