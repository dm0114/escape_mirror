package com.sinbangsa.data.entity;

import com.sinbangsa.utils.Role;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User implements UserDetails{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  long id;

    @OneToMany(mappedBy = "storeAdmin")
    private List<Store> stores;


    @OneToMany(mappedBy = "reservationUser")
    private List<Reservation> reservations = new ArrayList<>();

    @OneToMany(mappedBy = "likeThemeUser")
    private List<LikeTheme> likeThemes = new ArrayList<>();

    @OneToMany(mappedBy = "storeRelationUser")
    private List<UserStoreRelation> storeRelations = new ArrayList<>();

    @OneToMany(mappedBy = "themeRelationUser")
    private List<UserThemeRelation> themeRelations = new ArrayList<>();

    @OneToMany(mappedBy = "bookUser")
    private List<Book> books = new ArrayList<>();


    @OneToMany(mappedBy = "reviewUser")
    private List<ThemeReview> themeReviews = new ArrayList<>();

    @Column(unique = true)
    private String email;

    @Column
    private String password;

    @Column
    private String profile;

    @Column
    private Integer grade = 0;

    @Column
    private String nickname;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<Role> roles = new ArrayList<>();

    boolean accountNonExpired;
    boolean accountNonLocked;
    boolean credentialNonExpired;
    boolean enabled = false;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.roles;
    }

    @Override
    public String getPassword() { return this.password; }

    @Override
    public  String getUsername() { return  this.nickname; }

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



//    @Builder
//    public User(String email, String profile, String nickname, List<Role> role){
//        this.email = email;
//        this.profile = profile;
//        this.nickname = nickname;
//        this.roles = role;
//    }

    public void update(String nickname, String profile) {
        this.nickname = nickname;
        this.profile = profile;
    }


}
