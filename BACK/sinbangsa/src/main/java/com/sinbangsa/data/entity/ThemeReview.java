package com.sinbangsa.data.entity;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class ThemeReview {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @ManyToOne
    @JoinColumn(name = "theme_id")
    private Theme reviewTheme;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User reviewUser;

    @Column
    @NotNull
    private String content;


    @Column
    @NotNull
    private int star;

    @Column
    private int diff;

    @Column
    private int story;

    @Column
    private int interior;

    @Column
    private int activity;

    @Column
    private int horror;

    @Column
    private int locker;

    @Column
    private String imageUrl;

    @Column
    @NotNull
    private Date createAt;

    @Column
    @NotNull
    private int usedHint;

    @Column
    @NotNull
    private String clearTime;

    @Column
    @NotNull
    private Date clearDate;


}
