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
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long reservationId;

    @ManyToOne
    @JoinColumn(name = "themetime_id")
    private ThemeTime themeTime;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User reservationUser;

    @Column
    @NotNull
    private Date date;

    @Column
    @NotNull
    private Boolean accept=false;

}
