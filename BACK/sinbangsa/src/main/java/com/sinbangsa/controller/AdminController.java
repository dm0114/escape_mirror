package com.sinbangsa.controller;

import io.swagger.annotations.Api;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Api(value = "관리자 회원관리",tags = {"관리자 회원관리"})
@RequestMapping("/api/admin")
public class AdminController {
    private final Logger LOGGER = LoggerFactory.getLogger(AdminController.class);

}
