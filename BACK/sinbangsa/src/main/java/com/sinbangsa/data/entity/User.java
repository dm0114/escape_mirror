package com.sinbangsa.data.entity;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
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


    @Builder
    public User(String email, String profile, String nickname){
        this.email = email;
        this.profile = profile;
        this.nickname = nickname;
    }

    public void update(String nickname, String profile) {
        this.nickname = nickname;
        this.profile = profile;
    }


}
