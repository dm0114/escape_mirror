package com.sinbangsa.data.entity;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Cocomment {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @ManyToOne
    @JoinColumn(name = "comment_id")
    private Comment cocommentComment;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User cocommentUser;

    @Column
    private String content;

    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime created_at;
}
