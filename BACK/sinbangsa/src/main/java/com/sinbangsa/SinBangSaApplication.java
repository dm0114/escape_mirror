package com.sinbangsa;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
public class SinBangSaApplication {
    public static void main(String[] args){
        SpringApplication.run(SinBangSaApplication.class, args);
    }

}
