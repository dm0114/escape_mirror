package com.sinbangsa.controller;


import com.sinbangsa.data.dto.ReservationDto;
import com.sinbangsa.data.dto.ThemeTimeDto;
import com.sinbangsa.service.ReservationService;
import com.sinbangsa.service.UserService;
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
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reservation")
@RequiredArgsConstructor
@Api(value = "예약 API",tags = {"예약 API"})
public class ReservationController {

    private final Logger LOGGER = LoggerFactory.getLogger(ReservationController.class);

    private static final String SUCCESS = "success";

    private static final String FAIL = "fail";

    private final ReservationService reservationService;

    @PostMapping
    @ApiOperation(value = "예약하기")
    public ResponseEntity<String> createReservation(@RequestBody ReservationDto reservationDto, HttpServletRequest httpServletRequest) {
        LOGGER.info("[]");
        try {
            boolean result = reservationService.createReservation(reservationDto, httpServletRequest);
            if (!result) {
                return new ResponseEntity<String>("같은 시간에 예약이 이미 존재합니다.", HttpStatus.ALREADY_REPORTED);
            }
            return new ResponseEntity<String>("예약되었습니다.", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<String>("잘못된 요청입니다.", HttpStatus.BAD_REQUEST);
        }

    }

    @GetMapping
    @ApiOperation(value = "테마 예약가능시간")
    public ResponseEntity<List<ThemeTimeDto>> getThemeTime(@RequestParam long themeId) {
        LOGGER.info("[ReservationController] getThemeTime 호출");
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", StandardCharsets.UTF_8));
        try {
            List<ThemeTimeDto> result = reservationService.getThemeTime(themeId);
            return new ResponseEntity<List<ThemeTimeDto>>(result, headers, HttpStatus.OK);
        } catch (Exception e) {
            List<ThemeTimeDto> result = new ArrayList<>();
            return new ResponseEntity<List<ThemeTimeDto>>(result, headers, HttpStatus.BAD_REQUEST);
        }

    }

    @GetMapping("/date")
    @ApiOperation(value = "날짜별 예약현황")
    public ResponseEntity<List<Long>> canReserve(@RequestParam long themeId, String date) {
        LOGGER.info("[ReservationController] canReserve 호출");
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
        try {
            List<Long> result = reservationService.canReserve(themeId, date);
            LOGGER.info("[ReservationController] canReserveList 반환 성공");
            return new ResponseEntity<List<Long>>(result, headers, HttpStatus.OK);
        } catch (Exception e) {
            List<Long> result = reservationService.canReserve(themeId,date);
            LOGGER.info("[ReservationController] canReserveList 반환 실패");
            return new ResponseEntity<List<Long>>(result, headers, HttpStatus.BAD_REQUEST);
        }

    }

    @GetMapping("/searchuser")
    @ApiOperation(value = "닉네임 유효성 검사")
    public ResponseEntity<Long> validateNickname(@RequestParam String nickname) {
        LOGGER.info("[ReservationController] validateNickname 호출");
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
        try {
            Long result = reservationService.validateNickname(nickname);
            LOGGER.info("[ReservationController] validateNickname 반환 성공");
            return new ResponseEntity<Long>(result, headers, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.info("[ReservationController] validateNickname 반환 실패");
            return new ResponseEntity(headers, HttpStatus.BAD_REQUEST);
        }

    }
}
