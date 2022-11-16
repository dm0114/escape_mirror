package com.sinbangsa.data.entity;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;
@Builder
@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Store {

    @Id
    private long storeId;

    @ManyToOne
    @JoinColumn(name = "adminUser_id")
    private User storeAdmin;


    @OneToMany(mappedBy = "store")
    private List<Theme> themes = new ArrayList<>();

    @OneToMany(mappedBy = "userRelationStore")
    private List<UserStoreRelation> userRelations = new ArrayList<>();


    @Column
    @NotNull
    private String storeName;

    @Column
    private String address;

    @Column
    private String mapX;

    @Column
    private String mapY;

    @Column
    private String tel;

    @Column
    private String poster;

    @Column
    private String homepage;

    @Column
    private String region;

    public void update(String storeName, String address, String tel, String poster, String homepage, String region) {
        this.storeName = storeName;
        this.address = address;
        this.tel = tel;
        this.poster = poster;
        this.homepage = homepage;
        this.region = region;
    }

}
