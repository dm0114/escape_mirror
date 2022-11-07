package com.sinbangsa.data.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserStoreRelation {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User storeRelationUser;

    @ManyToOne
    @JoinColumn(name = "store_id")
    private Store userRelationStore;

    @Column
    private int rtype;

    @Column
    private int clearCount;

}
