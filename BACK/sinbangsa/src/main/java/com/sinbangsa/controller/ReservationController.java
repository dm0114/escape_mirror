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

import java.nio.charset.Charset;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("/reservation")
@RequiredArgsConstructor
@Api(value = "예약 API", tags = {"예약하기, 테마예약가능시간"})
public class ReservationController {

    private final Logger LOGGER = LoggerFactory.getLogger(UserService.class);

    private static final String SUCCESS = "success";

    private static final String FAIL = "fail";

    private final ReservationService reservationService;

    @PostMapping
    @ApiOperation(value = "예약하기")
    public ResponseEntity<Map<String,Object>> createReservation(@RequestBody ReservationDto reservationDto) {
        HashMap<String, Object> resultMap = new HashMap<>();


        boolean result = reservationService.createReservation(reservationDto);
        if (!result) {
            resultMap.put("message", FAIL);

            return new ResponseEntity<>(resultMap, HttpStatus.BAD_REQUEST);
        }
        resultMap.put("message", SUCCESS);

        return new ResponseEntity<>(resultMap, HttpStatus.CREATED);
    }

    @GetMapping
    @ApiOperation(value = "테마 예약가능시간")
    public ResponseEntity<List<ThemeTimeDto>> getThemeTime(@RequestParam long themeId) {
        LOGGER.info("[ReservationController] getThemeTime 호출");
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
        List<ThemeTimeDto> result = reservationService.getThemeTime(themeId);
        return new ResponseEntity<List<ThemeTimeDto>>(result, headers, HttpStatus.OK);
    }

}
