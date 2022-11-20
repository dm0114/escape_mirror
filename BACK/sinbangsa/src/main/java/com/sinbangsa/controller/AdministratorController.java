package com.sinbangsa.controller;

import com.sinbangsa.data.dto.*;
import com.sinbangsa.service.AdministratorService;
import com.sinbangsa.utils.JwtTokenProvider;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin")
@Api(value = "관리자페이지 API", tags = {"관리자페이지 API"})
public class AdministratorController {
    private final Logger LOGGER = LoggerFactory.getLogger(AdministratorController.class);

    private static final String SUCCESS = "success";

    private static final String FAIL = "fail";

    private final AdministratorService administratorService;

    private final JwtTokenProvider jwtTokenProvider;


    @GetMapping("/store")
    @ApiOperation(value = "카페 상세정보")
    public ResponseEntity<List<AdminStoreDto>> getAdminStoreDetail(HttpServletRequest httpServletRequest){
        LOGGER.info("[AdministratorController] preLoading 호출");
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));

        List<AdminStoreDto> adminStoreDetail = administratorService.getAdminStoreDetail(httpServletRequest);

        return new ResponseEntity<>(adminStoreDetail, headers, HttpStatus.OK);
    }

    @PostMapping("/store")
    @ApiOperation(value = "카페 상세정보 등록")
    public ResponseEntity<Boolean> registerStoreDetail(@RequestBody StoreRegisterDto storeResgesterDto,HttpServletRequest httpServletRequest){
        LOGGER.info("[AdministratorController] registerStoreDetail 호출");
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", StandardCharsets.UTF_8));

        boolean result = administratorService.registerStoreDetail(storeResgesterDto, httpServletRequest);
        if (result) {
            return new ResponseEntity<>(result, headers, HttpStatus.CREATED);
        }
        return new ResponseEntity<>(result, headers, HttpStatus.BAD_REQUEST);
    }

    @PutMapping("/store")
    @ApiOperation(value = "카페 상세정보 수정")
    public ResponseEntity<Boolean> updateStoreDetail(@RequestBody AdminStoreDto adminStoreDto,HttpServletRequest httpServletRequest){
        LOGGER.info("[AdministratorController] updateStoreDetail 호출");
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", StandardCharsets.UTF_8));

        boolean result = administratorService.updateStoreDetail(adminStoreDto, httpServletRequest);

        if (result) {
            return new ResponseEntity<>(result, headers, HttpStatus.ACCEPTED);
        }
        return new ResponseEntity<>(result, headers, HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/theme")
    @ApiOperation(value = "관리자 페이지 테마 리스트")
    public ResponseEntity<List<ThemeListDto>> getThemeList(@RequestParam Long storeId,HttpServletRequest httpServletRequest){
        LOGGER.info("[AdministratorController] getThemeList 호출");
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", StandardCharsets.UTF_8));

        List<ThemeListDto> themeList = administratorService.getThemeList(storeId, httpServletRequest);
        return new ResponseEntity<>(themeList, headers, HttpStatus.OK);
    }

    @GetMapping("/theme/{themeId}")
    @ApiOperation(value = "관리자 페이지 테마 상세")
    public ResponseEntity<AdministratorThemeDetailDto> getThemeDetail(@PathVariable long themeId,HttpServletRequest httpServletRequest){
        LOGGER.info("[AdministratorController] getThemeDetail 호출");
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", StandardCharsets.UTF_8));

        AdministratorThemeDetailDto themeDetail = administratorService.getThemeDetail(themeId, httpServletRequest);
        return new ResponseEntity<>(themeDetail, headers, HttpStatus.OK);
    }

    @PostMapping("/theme")
    @ApiOperation(value = "관리자 페이지 테마 등록")
    public ResponseEntity<Boolean> createTheme(@RequestBody ThemeRegisterDto themeRegister,HttpServletRequest httpServletRequest){
        LOGGER.info("[AdministratorController] createTheme 호출");
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", StandardCharsets.UTF_8));
        Boolean result = administratorService.registerThemeThemeTime(themeRegister, httpServletRequest);

        if (result) {
            return new ResponseEntity<>(result, headers, HttpStatus.CREATED);
        }
        return new ResponseEntity<>(result, headers, HttpStatus.BAD_REQUEST);
    }

    @PutMapping("/theme")
    @ApiOperation(value = "관리자 페이지 테마 수정")
    public ResponseEntity<Boolean> updateTheme(@RequestBody ThemeUpdateDto themeUpdateDto,HttpServletRequest httpServletRequest){
        LOGGER.info("[AdministratorController] updateTheme 호출");
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", StandardCharsets.UTF_8));

        Boolean result = administratorService.updateThemeThemeTime(themeUpdateDto, httpServletRequest);

        if (result) {
            return new ResponseEntity<>(result, headers, HttpStatus.ACCEPTED);
        }
        return new ResponseEntity<>(result, headers, HttpStatus.BAD_REQUEST);

    }

    @PostMapping("/theme/{themeId}/themeTime")
    @ApiOperation(value = "관리자 페이지 테마 시간 추가")
    public ResponseEntity<Boolean> createThemeTime(@PathVariable long themeId, @RequestBody ThemeTimeCreateDto themeTime,HttpServletRequest httpServletRequest){
        LOGGER.info("[AdministratorController] createThemeTime 호출");
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", StandardCharsets.UTF_8));
        // 어드민 아이디 토큰에서 가져오기

        Boolean result = administratorService.createThemeTime(themeId, themeTime.getThemeTime(), httpServletRequest);

        if (result) {
            return new ResponseEntity<>(result, headers, HttpStatus.CREATED);
        }
        return new ResponseEntity<>(result, headers, HttpStatus.BAD_REQUEST);
    }

    @PutMapping("/theme/themeTime")
    @ApiOperation(value = "관리자 페이지 테마 시간 수정")
    public ResponseEntity<Boolean> updateThemeTime(@RequestBody ThemeTimeDto themeTime, HttpServletRequest httpServletRequest) {
        LOGGER.info("[AdministratorController] updateThemeTime 호출");
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", StandardCharsets.UTF_8));
        // 어드민 아이디 토큰에서 가져오기
        Boolean result = administratorService.updateThemeTime(themeTime, httpServletRequest);

        if (result) {
            return new ResponseEntity<>(result, headers, HttpStatus.ACCEPTED);
        }
        return new ResponseEntity<>(result, headers, HttpStatus.BAD_REQUEST);

    }

    @DeleteMapping("/theme/themeTime/{themeTimeId}")
    @ApiOperation(value = "관리자 페이지 테마 시간 삭제")
    public ResponseEntity<Boolean> deleteThemeTime(@PathVariable long themeTimeId, HttpServletRequest httpServletRequest) {
        LOGGER.info("[AdministratorController] deleteThemeTime 호출");
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", StandardCharsets.UTF_8));

        boolean result = administratorService.deleteThemeTime(themeTimeId, httpServletRequest);
        if (result) {
            return new ResponseEntity<>(result, headers, HttpStatus.OK);
        }
        return new ResponseEntity<>(result, headers, HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping("/theme/{themeId}")
    @ApiOperation(value = "관리자 페이지 테마 삭제")
    public ResponseEntity<Boolean> deleteTheme(@PathVariable long themeId, HttpServletRequest httpServletRequest) {
        LOGGER.info("[AdministratorController] deleteTheme 호출");
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", StandardCharsets.UTF_8));
        // 어드민 아이디 토큰에서 가져오기
        boolean result = administratorService.deleteTheme(themeId, httpServletRequest);

        if (result) {
            return new ResponseEntity<>(result, headers, HttpStatus.OK);
        }
        return new ResponseEntity<>(result, headers, HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/reservation/month/{storeId}")
    @ApiOperation(value = "관리자페이지 월별 예약관리")
    public ResponseEntity<List<ReservationCountDto>> getReservationCount (@PathVariable long storeId,HttpServletRequest httpServletRequest){
        LOGGER.info("[AdministratorController] getReservationCount 호출");
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", StandardCharsets.UTF_8));

        List<ReservationCountDto> reservationCountDtoList = administratorService.getReservationCount(httpServletRequest, storeId);

        return new ResponseEntity<>(reservationCountDtoList, headers, HttpStatus.OK);
    }

    @GetMapping("/reservation/day/{storeId}")
    @ApiOperation(value = "관리자 페이지 일별 예약 관리")

    public ResponseEntity<ReservationAdminDayDto> getReservationAdminDay(@RequestParam String reservationDay, @PathVariable long storeId, HttpServletRequest httpServletRequest) {
        LOGGER.info("[AdministratorController] getReservationCount 호출");
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", StandardCharsets.UTF_8));



        ReservationAdminDayDto reservationAdminDay = administratorService.getReservationAdminDay(storeId ,reservationDay, httpServletRequest);

        return new ResponseEntity<>(reservationAdminDay, headers, HttpStatus.OK);

    }

    @PutMapping("/reservation/{reservationId}")
    @ApiOperation(value = "관리자 예약 승인")
    public ResponseEntity<Boolean> approveReservation(@PathVariable long reservationId, HttpServletRequest httpServletRequest) {
        LOGGER.info("[AdministratorController] approveReservation 호출");
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", StandardCharsets.UTF_8));

        boolean result = administratorService.approveReservation(httpServletRequest, reservationId);

        if (result) {
            return new ResponseEntity<>(result, headers, HttpStatus.ACCEPTED);
        }
        return new ResponseEntity<>(result, headers, HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping("/reservation/{reservationId}")
    @ApiOperation(value = "관리자 예약 취소")
    public ResponseEntity<Boolean> deleteReservation(@PathVariable long reservationId,HttpServletRequest httpServletRequest) {
        LOGGER.info("[AdministratorController] deleteReservation 호출");
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", StandardCharsets.UTF_8));
        // 어드민 아이디 토큰에서 가져오기

        boolean result = administratorService.deleteReservation(reservationId, httpServletRequest);
        if (result) {
            return new ResponseEntity<>(result, headers, HttpStatus.OK);
        }
        return new ResponseEntity<>(result, headers, HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/validation")
    @ApiOperation(value = "탈출 인증")
    public ResponseEntity<Boolean> verificationExit(@RequestBody BookRegisterDto bookRegister,HttpServletRequest httpServletRequest){
        LOGGER.info("[AdministratorController] valificationExit 호출");
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", StandardCharsets.UTF_8));
        // 어드민 아이디 토큰에서 가져오기

        boolean result = administratorService.verificationExit(bookRegister, httpServletRequest);
        if (result) {
            return new ResponseEntity<>(result, headers, HttpStatus.OK);
        }
        return new ResponseEntity<>(result, headers, HttpStatus.BAD_REQUEST);
    }


}
