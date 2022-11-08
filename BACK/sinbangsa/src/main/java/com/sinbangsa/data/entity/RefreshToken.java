package com.sinbangsa.data.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class RefreshToken {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "refresh_token_id")
    private Long id;

    private String email;

    private String refreshToken;

    private RefreshToken(String email,String token){
        this.email = email;
        this.refreshToken = token;
    }

    public static RefreshToken createToken(String email,String token){ return new RefreshToken(email, token);}

    public void changeToken(String token) { this.refreshToken = token; }
}
