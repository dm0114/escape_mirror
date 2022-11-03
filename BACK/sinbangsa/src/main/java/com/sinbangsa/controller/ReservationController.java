package com.sinbangsa.controller;


import com.sinbangsa.data.dto.ReservationDto;
import com.sinbangsa.service.ReservationService;
import com.sinbangsa.service.UserService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("/reservation")
@RequiredArgsConstructor
public class ReservationController {

    private final Logger LOGGER = LoggerFactory.getLogger(UserService.class);

    private static final String SUCCESS = "success";

    private static final String FAIL = "fail";

    private final ReservationService reservationService;

    @PostMapping
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

}
