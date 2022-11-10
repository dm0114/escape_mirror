package com.sinbangsa.data.entity;


import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;
@Builder
@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
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
    private String date;

    @Column
    @NotNull
    private Boolean accept=false;

    @Column
    private int status=0;

    public void update(User reservationUser,boolean accept, int status) {
        this.reservationUser = reservationUser;
        this.accept = accept;
        this.status = status;
    }

}
