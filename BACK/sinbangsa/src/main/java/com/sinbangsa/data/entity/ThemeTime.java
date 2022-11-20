package com.sinbangsa.data.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Getter
@NoArgsConstructor
public class ThemeTime {

    @Id
    private long id;

    @ManyToOne
    @JoinColumn(name = "theme_id")
    private Theme theme;

    @Column
    private String time;

    @Builder
    public ThemeTime(long id, Theme theme, String time) {
        this.id = id;
        this.theme = theme;
        this.time = time;
    }

    public void update(String time) {
        this.time = time;
    }


}
