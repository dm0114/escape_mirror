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

    @OneToMany(mappedBy = "userRelationTheme")
    private List<UserThemeRelation> userRelations = new ArrayList<>();

    @Column
    private String themeName;

    @Column
    private String genre;

    @Column
    private String capacity;

    @Column
    private String price;

    @Column
    private int difficulty;

    @Column
    private int leadtime;

    @Column(length = 1500)
    private String description;

    @Column
    private String poster;

}
