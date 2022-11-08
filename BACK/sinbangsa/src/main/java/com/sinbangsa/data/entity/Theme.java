package com.sinbangsa.data.entity;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Theme {

    @Id
    private long id;

    @ManyToOne
    @JoinColumn(name="store_id")
    private Store store;

    @OneToMany(mappedBy = "theme")
    private List<ThemeTime> themeTimes = new ArrayList<>();

    @OneToMany(mappedBy = "likeTheme")
    private List<LikeTheme> likeThemes = new ArrayList<>();

    @OneToMany(mappedBy = "reviewTheme")
    private List<ThemeReview> themeReviews = new ArrayList<>();

    @Column
    @NotNull
    private String themeName;

    @Column
    @NotNull
    private String genre;

    @Column
    @NotNull
    private String capacity;

    @Column
    @NotNull
    private String price;

    @Column
    @NotNull
    private String difficulty;

    @Column
    @NotNull
    private int leadtime;

    @Column(length = 1500)
    @NotNull
    private String description;

    @Column
    @NotNull
    private String poster;

}
