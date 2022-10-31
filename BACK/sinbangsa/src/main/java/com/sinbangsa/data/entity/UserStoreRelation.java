package com.sinbangsa.data.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class UserStoreRelation {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @ManyToOne
    private User storeRelationUser;

    @ManyToOne
    private Store userRelationStore;

    @Column
    private int rtype;
}
