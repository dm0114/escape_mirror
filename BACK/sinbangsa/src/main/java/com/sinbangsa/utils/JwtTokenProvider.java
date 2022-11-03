package com.sinbangsa.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@RequiredArgsConstructor
@Component
public class JwtTokenProvider {


    private final UserDetailsService userDetailsService;

//    private static String secret ;
//
//    @Value("${springboot.jwt.secret}")
//    public void setKey(String value) {
//        secret = value;
//    }
    static Key secretKey = Keys.hmacShaKeyFor("SinBangSaSecretKeyJWTTokenCreateKey".getBytes(StandardCharsets.UTF_8));

    // 엑세스 토큰 만료시간 10분
    private static final long expireTime = 10 * 60 * 1000L;

    //리프레시 토큰 만료시간 7일 => 나중에 줄인 뒤 갱신하는 방식으로 갈 것.
    private final long refreshExpireTime = 7 * 24 * 60 * 60 * 1000L;

    public static final String ISSUER = "escapedictionary.com";

    public String createAccessToken(String email){
        Claims claims = Jwts.claims().setSubject(email);
        claims.put("roles","User");
        Date now = new Date();

        return Jwts.builder()
                .setClaims(claims)
                .setIssuer(ISSUER)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + expireTime))
                .signWith(secretKey, SignatureAlgorithm.HS256)
                .compact();
    }

    public String createRefreshToken(String email){
        Claims claims = Jwts.claims().setSubject(email);
        claims.put("roles","User");
        Date now = new Date();

        return Jwts.builder()
                .setClaims(claims)
                .setIssuer(ISSUER)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + refreshExpireTime))
                .signWith(secretKey, SignatureAlgorithm.HS256)
                .compact();
    }

    public Authentication getAuthentication(String token){
        UserDetails userDetails = userDetailsService.loadUserByUsername(this.getEmail(token));
        return new UsernamePasswordAuthenticationToken(userDetails, "",userDetails.getAuthorities());
    }

    public String getEmail(String Token){
        String info = Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(Token).getBody().getSubject();
        return info;
    }

    public String resolveToken(HttpServletRequest request, String header) {
        String bearerToken = request.getHeader(header);
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }

    public boolean validateToken(String token){
        try{
            Jws<Claims> claims = Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token);

            return !claims.getBody().getExpiration().before(new Date());
        } catch (Exception e) {
            return false;
        }
    }


}
