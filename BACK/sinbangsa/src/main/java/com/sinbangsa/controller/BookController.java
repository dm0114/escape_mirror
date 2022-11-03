package com.sinbangsa.controller;


import com.sinbangsa.service.UserService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping(name = "review")
public class BookController {

    private final Logger LOGGER = LoggerFactory.getLogger(UserService.class);

    private static final String SUCCESS = "success";

    private static final String FAIL = "fail";




}
