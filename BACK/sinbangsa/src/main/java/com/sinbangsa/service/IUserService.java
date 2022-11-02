package com.sinbangsa.service;


import com.sinbangsa.data.dto.UserDto;

import java.security.NoSuchAlgorithmException;

public interface IUserService {

    boolean join(UserDto userDto);
}
