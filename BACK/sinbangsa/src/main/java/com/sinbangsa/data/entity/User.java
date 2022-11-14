package com.sinbangsa.data.entity;

import com.sinbangsa.utils.Role;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  long id;


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
    private String profile;

    @Column
    private Integer grade = 0;

    @Column
    private String nickname;

    @Enumerated(EnumType.STRING)
    private Role role;



    @Builder
    public User(String email, String profile, String nickname, Role role){
        this.email = email;
        this.profile = profile;
        this.nickname = nickname;
        this.role = role;
    }

    public void update(String nickname, String profile) {
        this.nickname = nickname;
        this.profile = profile;
    }


}
