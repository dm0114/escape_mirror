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
public class Store {

    @Id
    private long storeId;

    @ManyToOne
    @JoinColumn(name = "admin")
    private Admin storeAdmin;


    @OneToMany(mappedBy = "store")
    private List<Theme> themes = new ArrayList<>();

    @OneToMany(mappedBy = "userRelationStore")
    private List<UserStoreRelation> userRelations = new ArrayList<>();


    @Column
    @NotNull
    private String storeName;

    @Column
    @NotNull
    private String address;

    @Column
    @NotNull
    private String mapX;

    @Column
    @NotNull
    private String mapY;

    @Column
    @NotNull
    private String tel;

    @Column
    @NotNull
    private String poster;

    @Column
    @NotNull
    private String homepage;

    @Column
    @NotNull
    private String region;


}
