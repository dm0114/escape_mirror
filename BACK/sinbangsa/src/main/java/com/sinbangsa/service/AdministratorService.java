package com.sinbangsa.service;

import com.sinbangsa.data.dto.*;
import com.sinbangsa.data.entity.ThemeTime;
import com.sun.org.apache.xpath.internal.operations.Bool;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface AdministratorService {
    List<AdminStoreDto> getAdminStoreDetail(HttpServletRequest httpServletRequest);
    Boolean registerStoreDetail(StoreRegisterDto storeRegisterDto, HttpServletRequest httpServletRequest);
    Boolean updateStoreDetail(AdminStoreDto adminStoreDto, HttpServletRequest httpServletRequest);
    List<ThemeListDto> getThemeList(long storeId, HttpServletRequest httpServletRequest);
    AdministratorThemeDetailDto getThemeDetail(long themeId, HttpServletRequest httpServletRequest);
    Boolean registerThemeThemeTime(ThemeRegisterDto themeRegisterDto, HttpServletRequest httpServletRequest);
    Long registerTheme(ThemeRegisterDto themeRegister);
    Boolean registerThemeTime(List<String> themeTimes, long createdThemeId);
    Boolean updateThemeThemeTime(ThemeUpdateDto themeUpdateDto, HttpServletRequest httpServletRequest);
    Boolean createThemeTime(long themeId, String themeTime, HttpServletRequest httpServletRequest);
    Boolean updateThemeTime(ThemeTimeDto themeTime, HttpServletRequest httpServletRequest);
    Boolean deleteThemeTime(long themeTimeId, HttpServletRequest httpServletRequest);
    Boolean deleteTheme(long themeId, HttpServletRequest httpServletRequest);
    List<ReservationCountDto> getReservationCount(HttpServletRequest httpServletRequest, long storeId);
    ReservationAdminDayDto getReservationAdminDay(long storeId, String reservationDay, HttpServletRequest httpServletRequest);
    Boolean approveReservation(HttpServletRequest httpServletRequest, long reservationId);
    Boolean deleteReservation(long reservationId, HttpServletRequest httpServletRequest);
    Boolean verificationExit(BookRegisterDto bookRegister,HttpServletRequest httpServletRequest);
}
