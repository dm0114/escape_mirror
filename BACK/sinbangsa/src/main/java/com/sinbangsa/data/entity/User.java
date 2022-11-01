package com.sinbangsa.data.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private  long id;

    @OneToMany(mappedBy = "storeUser")
    private List<Store> stores = new ArrayList<>();

    @OneToMany(mappedBy = "articleUser")
    private List<Article> articles = new ArrayList<>();

    @OneToMany(mappedBy = "commentUser")
    private List<Comment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "reservationUser")
    private List<Reservation> reservations = new ArrayList<>();

    @OneToMany(mappedBy = "likeThemeUser")
    private List<LikeTheme> likeThemes = new ArrayList<>();

    @OneToMany(mappedBy = "storeRelationUser")
    private List<UserStoreRelation> storeRelations = new ArrayList<>();

    @OneToMany(mappedBy = "bookUser")
    private List<Book> books = new ArrayList<>();

    @Column
    @NotNull
    private String email;


    @Column
    @NotNull
    private boolean admin;

    @Column
    @NotNull
    private String tel;

    @Column
    @NotNull
    private LocalDate birth;

    @Column
    @NotNull
    private String password;

    @Column
    private String auth;

    @Column
    private String profile;

    @Column
    private Integer grade = 0;

    @Column
    private String Title;

    @Column
    private String username;

    @Column
    private String nickname;

}
