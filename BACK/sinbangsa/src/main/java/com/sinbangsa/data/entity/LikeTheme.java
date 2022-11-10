package com.sinbangsa.data.entity;


import lombok.*;

import javax.persistence.*;
@Builder
@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class LikeTheme {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User likeThemeUser;

    @ManyToOne
    @JoinColumn(name = "theme_id")
    private Theme likeTheme;




}
