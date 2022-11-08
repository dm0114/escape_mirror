package com.sinbangsa.utils;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;

@RequiredArgsConstructor
@Component
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    public final JwtTokenProvider jwtTokenProvider;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException {

        System.out.println("oauth handler 시작");
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

        System.out.println("정보 가져오기");

        Map<String, Object> kakao_account = (Map<String, Object>) oAuth2User.getAttributes().get("kakao_account");
        String email = (String) kakao_account.get("email");

        System.out.println("handler email" + email);

        String accessToken = jwtTokenProvider.createAccessToken(email);

        System.out.println("accessToken 생성" + accessToken);

        String uri = makeRedirectUri(accessToken);
        System.out.println("url " + uri);


        if (response.isCommitted()) {
            System.out.println("이미 커밋됨");
            return;
        }
        getRedirectStrategy().sendRedirect(request, response, uri);


    }

    private String makeRedirectUri(String token){
        return UriComponentsBuilder.fromUriString("http://localhost:3000/oauth2/redirect/"+token)
                .build().toUriString();
    }
}
