package com.api.abs.user;

import com.api.abs.book.book;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table
public class DAOUser{

    @Id
    @GeneratedValue
    private Long id;

    @Column(
            nullable = false
    )
    private String fname;

    @Column(
            nullable = false
    )
    private String lname;

    @Column(
            nullable = false
    )

    private String password;

    @Column(
            unique = true,
            nullable = false
    )
    private String email;

    @Column(
            nullable = false
    )
    private LocalDate dob;

    @Column(
            nullable = false
    )
    @CreationTimestamp
    private LocalDateTime CreateAt;

    @ManyToMany
    @JsonIgnore
    private List<book> books;

    @Transient
    private Integer age;

    public DAOUser() {
    }

    public DAOUser(Long id, String fname, String lname, String email, String password, LocalDate dob, Integer age) {

        this.id = id;
        this.fname = fname;
        this.lname = lname;
        this.email = email;
        this.dob = dob;
        this.age = age;
        this.password = password;
    }

    public DAOUser(String fname, String lname, String email, String password, LocalDate dob) {
        this.fname = fname;
        this.lname = lname;
        this.email = email;
        this.dob = dob;
        this.password = password;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFname() {
        return fname;
    }

    public void setFname(String fname) {
        this.fname = fname;
    }

    public String getLname() {
        return lname;
    }

    public void setLname(String lname) {
        this.lname = lname;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDate getDob() {
        return dob;
    }

    public void setDob(LocalDate dob) {
        this.dob = dob;
    }

    public Integer getAge() {
        return Period.between(this.dob,LocalDate.now()).getYears();
    }

    public LocalDateTime getCreateAt() {
        return CreateAt;
    }

    public List<book> getBooks() {
        return books;
    }

    public void setBooks(List<book> books) {
        this.books = books;
    }

    public void addBooks(book book){
        this.getBooks().add(book);
    }

    @Override
    public String toString() {
        return "{ " +
                "'id'=" + id +
                ", 'fname':'" + fname + '\'' +
                ", 'lname':'" + lname + '\'' +
                ", 'email':'" + email + '\'' +
                ", 'dob':" + dob +
                ", 'CreateAt':" + CreateAt +
                "}";
    }
    public String toPayload(){
        return fname+"#"+lname+"#"+email;
    }
}