package com.api.abs.comment;

import com.api.abs.book.book;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table
public class comment {

    @Id
    @GeneratedValue
    private Long id;

    @Column(columnDefinition = "TEXT",nullable = false)
    private String comment;

    private Long userId;

    private String userName;

    private Integer likes;

    @CreationTimestamp
    private LocalDateTime CreateAt;

    public comment() {
    }

    public comment(String comment, Long userId) {
        this.comment = comment;
        this.userId = userId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Integer getLikes() {
        return likes;
    }

    public void setLikes(Integer likes) {
        this.likes = likes;
    }

    public LocalDateTime getCreateAt() {
        return CreateAt;
    }

    public void setCreateAt(LocalDateTime createAt) {
        CreateAt = createAt;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }
}
