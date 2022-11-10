package com.sinbangsa.data.entity;


import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
public class Admin {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @OneToMany(mappedBy = "storeAdmin")
    private List<Store> stores;

    @Column
    private String adminName;

    @Column
    private String userId;

    @Column
    private String password;

}
