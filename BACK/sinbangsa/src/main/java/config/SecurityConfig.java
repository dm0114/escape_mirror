package config;

import com.sinbangsa.utils.JwtAuthenticationFilter;
import com.sinbangsa.utils.JwtTokenProvider;
import com.sinbangsa.utils.OAuth2AuthenticationSuccessHandler;
import com.sinbangsa.utils.UserOAuth2Service;
import lombok.RequiredArgsConstructor;
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
import org.springframework.stereotype.Component;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtTokenProvider jwtTokenProvider;

    private final UserOAuth2Service userOAuth2Service;

    private final OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler;

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
                .csrf().disable() // csrf 보안 토큰 disable
                .cors()
                .and()
                .headers()
                .frameOptions()
                .deny()
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS) //토큰 기반이므로 세션 사용 x
                // 인증처리에서는 세션을 사용하지 않는다는 뜻
                .and()
                .authorizeRequests() //요청에 관해 인증체크
                .antMatchers("/api/**").permitAll() // 우선 모두 허용
                .anyRequest().permitAll() // 나머지 요청 전부 접근가능
                .and()
                .addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider),
                        UsernamePasswordAuthenticationFilter.class)
                .oauth2Login().defaultSuccessUrl("/login-success").successHandler(oAuth2AuthenticationSuccessHandler)
                .userInfoEndpoint().userService(userOAuth2Service);



        return http.build();

    }

}
