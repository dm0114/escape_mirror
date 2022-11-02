package com.sinbangsa.utils;

import com.sinbangsa.data.entity.User;
import com.sinbangsa.data.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class JWTUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email){
        User user= userRepository.getByEmail(email);

        if (user != null){
            JWTUserDetails jwtUserDetails = new JWTUserDetails(user);
            return jwtUserDetails;
        }
        return null;
    }
}
