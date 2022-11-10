package com.sinbangsa.data.entity;

import lombok.*;

import javax.persistence.*;
@Builder
@Entity
@Getter
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


}
