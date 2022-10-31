package com.sinbangsa.data.entity;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Theme {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @ManyToOne
    @JoinColumn(name="store_id")
    private Store store;

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

    @Column
    @NotNull
    private String description;

    @Column
    @NotNull
    private String poster;

}
