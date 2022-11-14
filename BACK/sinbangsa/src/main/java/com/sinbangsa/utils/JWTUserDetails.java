package com.sinbangsa.utils;

import com.sinbangsa.data.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@RequiredArgsConstructor
public class JWTUserDetails implements UserDetails {
    private final User user;

    boolean accountNonExpired;
    boolean accountNonLocked;
    boolean credentialNonExpired;
    boolean enabled = false;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authorities = new ArrayList<>();
        GrantedAuthority authority = new SimpleGrantedAuthority("ROLE_"+this.user.getRole().name());
        authorities.add(authority);
        return authorities;
    }

    @Override
    public String getPassword() { return null; }

    @Override
    public  String getUsername() { return  null; }

    @Override
    public boolean isAccountNonExpired() {
        return this.accountNonExpired;
    }

    @Override
    public boolean isAccountNonLocked() {
        return this.accountNonLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return this.credentialNonExpired;
    }

    @Override
    public boolean isEnabled() {
        return this.enabled;
    }

}
