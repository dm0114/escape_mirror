package com.sinbangsa.utils;

import com.sinbangsa.data.entity.RefreshToken;
import com.sinbangsa.data.repository.RefreshTokenRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@RequiredArgsConstructor
@Component
public class JwtTokenProvider {

    private final Logger LOGGER = LoggerFactory.getLogger(JwtTokenProvider.class);
    private final UserDetailsService userDetailsService;

    private final RefreshTokenRepository refreshTokenRepository;

    static Key secretKey = Keys.hmacShaKeyFor("SinBangSaSecretKeyJWTTokenCreateKey".getBytes(StandardCharsets.UTF_8));

    // 엑세스 토큰 만료시간 10분 (현재 임시로 1일)
    private static final long expireTime = 24 * 60 * 60 * 1000L;

    //리프레시 토큰 만료시간 7일 => 나중에 줄인 뒤 갱신하는 방식으로 갈 것.
    private final long refreshExpireTime = 7 * 24 * 60 * 60 * 1000L;

    public static final String ISSUER = "escapedictionary.com";

    public String createAccessToken(String email,Long id,String role){
        Claims claims = Jwts.claims().setSubject(email);
        claims.put("roles",role);
        claims.put("userId",id);
        Date now = new Date();

        String token = Jwts.builder()
                .setClaims(claims)
                .setIssuer(ISSUER)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + expireTime))
                .signWith(secretKey, SignatureAlgorithm.HS256)
                .compact();

        LOGGER.info("AccessToken 발급 완료");
        return token;
    }

    @Transactional
    public String createRefreshToken(String email,Long userId,String role){

        LOGGER.info("[createRefreshToken] 토큰 생성 시작");

        Claims claims = Jwts.claims().setSubject(email);
        claims.put("roles",role);
        claims.put("userId",userId);
        Date now = new Date();

        String token = Jwts.builder()
                .setClaims(claims)
                .setIssuer(ISSUER)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + refreshExpireTime))
                .signWith(secretKey, SignatureAlgorithm.HS256)
                .compact();


        RefreshToken findRefreshToken = refreshTokenRepository.findByEmail(email)
                        .orElse(RefreshToken.createToken(email, token));

        findRefreshToken.changeToken(token);
        refreshTokenRepository.save(findRefreshToken);

        LOGGER.info("[createRefreshToken] 토큰 생성 완료");

        return token;
    }

    public Authentication getAuthentication(String token){

        UserDetails userDetails = userDetailsService.loadUserByUsername(this.getEmail(token));
        LOGGER.info("권한 테스트");
        return new UsernamePasswordAuthenticationToken(userDetails, "",userDetails.getAuthorities());
    } //

    public String getEmail(String Token){
        String info = Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(Token).getBody().getSubject();
        return info;
    }

    public Long getUserId(String Token){
        Long info = Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(Token).getBody().get("userId",Long.class);
        System.out.println(info);
        return info;
    }

    public String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }

//    @Transactional
//    public String reissueRefreshToken(String refreshToken) throws RuntimeException{
//        Authentication authentication = getAuthentication(refreshToken);
//        RefreshToken findRefreshToken = refreshTokenRepository.findByEmail(authentication.getName())
//                .orElseThrow(() -> new UsernameNotFoundException("not found error!!!"));
//
//        if (findRefreshToken.getRefreshToken().equals(refreshToken)){
//            String newRefreshToken = createRefreshToken(authentication.getName());
//            findRefreshToken.changeToken(newRefreshToken);
//            return newRefreshToken;
//        }else{
//            LOGGER.info("리프레시 토큰 불일치");
//            return null;
//        }
//    }

    public boolean validateToken(String token){
        try{
            Jws<Claims> claims = Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token);

            return !claims.getBody().getExpiration().before(new Date());
        } catch (Exception e) {
            return false;
        }
    }


}
