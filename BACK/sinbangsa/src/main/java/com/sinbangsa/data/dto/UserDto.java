package com.sinbangsa.data.dto;


import lombok.*;

import java.time.LocalDate;


@Getter
@Setter
@RequiredArgsConstructor
public class UserDto {

    private String username;

    private String nickname;

    private String password;

    private String tel;

    private LocalDate birth;

    private String profileImg;

    private String email;



}
