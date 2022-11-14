package com.sinbangsa.data.entity;


import lombok.*;
import org.springframework.security.crypto.password.PasswordEncoder;

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

    @Builder
    public Admin(String adminName,String userId,String password){
        this.adminName = adminName;
        this.password = password;
        this.userId = userId;
    }

}
