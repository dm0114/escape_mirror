package com.sinbangsa.data.dto;


import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@NoArgsConstructor
@Getter
@Setter
public class UserDto {

    private String username;

    private String nickname;

    private String password;

    private String tel;

    private LocalDate birth;

    private String profileImg;

    private String email;

}
