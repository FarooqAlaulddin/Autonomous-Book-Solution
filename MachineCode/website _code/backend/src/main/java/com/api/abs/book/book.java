package com.api.abs.book;

import com.api.abs.comment.comment;
import com.api.abs.likee.likee;
import com.api.abs.user.DAOUser;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table
public class book {


    @Id
    @GeneratedValue
    private Long id;

    @Column(nullable = false, unique = true)
    private Long ISBN;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String subtitle;

    @Column(nullable = false)
    private String author;

    @Column(nullable = false)
    private String department;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String description;

    @Column(nullable = false)
    private Integer quantity;

    @ManyToMany(mappedBy = "books")
    @JsonIgnore
    private List<DAOUser> users;

    @OneToMany(
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<comment> comments = new ArrayList<>();;

    @OneToMany(
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<likee> likes = new ArrayList<>();

    @CreationTimestamp
    private LocalDateTime CreateAt;

    public book() {
    }

    public book(
            Long ISBN,
            String title,
            String subtitle,
            String author,
            String department,
            Integer quantity,
            String description
    ) {
        this.ISBN = ISBN;
        this.title = title;
        this.subtitle = subtitle;
        this.author = author;
        this.department = department;
        this.description = description;
        this.quantity = quantity;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getISBN() {
        return ISBN;
    }

    public void setISBN(Long ISBN) {
        this.ISBN = ISBN;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public LocalDateTime getCreateAt() {
        return CreateAt;
    }

    public void setCreateAt(LocalDateTime createAt) {
        CreateAt = createAt;
    }

    public List<DAOUser> getUsers() {
        return users;
    }

    public void setUsers(List<DAOUser> users) {
        this.users = users;
    }

    public List<comment> getComments() {
        return comments;
    }

    public void setComments(List<comment> comments) {
        this.comments = comments;
    }

    public String getSubtitle() {
        return subtitle;
    }

    public void setSubtitle(String subtitle) {
        this.subtitle = subtitle;
    }

    public List<likee> getLikes() {
        return likes;
    }

    public void setLikes(List<likee> likes) {
        this.likes = likes;
    }

    @Override
    public String toString() {
        return "book{" +
                "id=" + id +
                ", ISBN=" + ISBN +
                ", title='" + title + '\'' +
                ", author='" + author + '\'' +
                ", department='" + department + '\'' +
                ", description='" + description + '\'' +
                ", quantity=" + quantity +
                ", CreateAt=" + CreateAt +
                '}';
    }
}
