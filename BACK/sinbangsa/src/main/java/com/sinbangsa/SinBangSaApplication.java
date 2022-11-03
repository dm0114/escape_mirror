package com.sinbangsa;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
//@SpringBootApplication
public class SinBangSaApplication {
    public static void main(String[] args){
        SpringApplication.run(SinBangSaApplication.class, args);
    }

}
