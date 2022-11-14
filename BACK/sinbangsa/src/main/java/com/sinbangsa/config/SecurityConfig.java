package com.sinbangsa.config;

import com.sinbangsa.utils.JwtAuthenticationFilter;
import com.sinbangsa.utils.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
<<<<<<< HEAD:BACK/sinbangsa/src/main/java/config/SecurityConfig.java
import org.springframework.stereotype.Component;
=======
>>>>>>> 65acd060c6b6f13fa910ed561b932b0b1b4c9d78:BACK/sinbangsa/src/main/java/com/sinbangsa/config/SecurityConfig.java
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@SpringBootConfiguration
public class SecurityConfig {

    private final JwtTokenProvider jwtTokenProvider;


    @Bean
    public PasswordEncoder passwordEncoder() { return new BCryptPasswordEncoder();}

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception{
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                .httpBasic().disable() //restapi를 위해 기본 설정 해제
                .cors().configurationSource(corsConfigurationSource())
                .and()
                .csrf().disable() // csrf 보안 토큰 disable
                .headers()
                .frameOptions()
                .deny()
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS) //토큰 기반이므로 세션 사용 x
                // 인증처리에서는 세션을 사용하지 않는다는 뜻
                .and()
                .authorizeRequests() //요청에 관해 인증체크
                .antMatchers("/api/user/**","/api/admin/auth/**").permitAll()
                .antMatchers("/v3/api-docs", "/swagger-resources/**", "/swagger-ui.html", "/webjars/**", "/swagger/**","/swagger*/**").permitAll()
                .anyRequest().authenticated()
                .and()
                .formLogin().disable()
                .addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider),
                        UsernamePasswordAuthenticationFilter.class);


        return http.build();

    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedHeader("*");
        configuration.addAllowedMethod("*");
        configuration.addAllowedOrigin("*");
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
<<<<<<< HEAD:BACK/sinbangsa/src/main/java/config/SecurityConfig.java

    }

=======
    }


>>>>>>> 65acd060c6b6f13fa910ed561b932b0b1b4c9d78:BACK/sinbangsa/src/main/java/com/sinbangsa/config/SecurityConfig.java
}
