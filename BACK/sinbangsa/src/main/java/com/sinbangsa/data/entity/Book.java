package com.sinbangsa.data.entity;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User bookUser;

    @ManyToOne
    @JoinColumn(name = "theme_id")
    private Theme bookTheme;


    @Column
    private int clear;

    @Column
    private Boolean review;

    @Column
    private LocalDate doneDate;

    @Column
    private int usedHint;

    @Column
    private String clearTime;

}

