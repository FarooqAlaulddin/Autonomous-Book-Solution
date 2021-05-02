package com.api.abs.order;

import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

import static java.lang.Boolean.TRUE;

@Entity
@Table(name="orders")
public class order {

//    public String getBookName() {
//        return bookName;
//    }
//
//    public void setBookName(String bookName) {
//        this.bookName = bookName;
//    }

    @Id
    @SequenceGenerator(
            name = "order_sequence",
            sequenceName = "order_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "order_sequence"
    )

   // private String bookName;
    private Long id;

    @Column(
            nullable = false
    )
    private Long user_id;

    @Column(
            nullable = false
    )
    private Long book_id;

    public Long getUser_id() {
        return user_id;
    }

    public void setUser_id(Long user_id) {
        this.user_id = user_id;
    }

    public Long getBook_id() {
        return book_id;
    }

    public void setBook_id(Long book_id) {
        this.book_id = book_id;
    }


    private LocalDate pickup_date;




    private Time pickup_time;



    private Time pickup_time_end;

    public int getIs_pickedup() {
        return is_pickedup;
    }

    public void setIs_pickedup(int is_pickedup) {
        this.is_pickedup = is_pickedup;
    }

    private int is_pickedup;

    private String bookName;
    public String getBookName() {
        return bookName;
    }

    public void setBookName(String bookName) {
        this.bookName = bookName;
    }


    public Time getPickup_time_end() {
        return pickup_time_end;
    }

    public void setPickup_time_end(Time pickup_time_end) {
        this.pickup_time_end = pickup_time_end;
    }

    private int is_checkedout;

    @Column(
            nullable = false
    )
    private int is_returned;

    @Column(
            nullable = false
    )

    @CreationTimestamp
    private LocalDateTime create_at;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getPickup_date() {
        return pickup_date;
    }

    public void setPickup_date(LocalDate pickup_date) {
        this.pickup_date = pickup_date;
    }

    public Time getPickup_time() {
        return pickup_time;
    }

    public void setPickup_time(Time pickup_time) {
        this.pickup_time = pickup_time;
    }

    public int getIs_checkedout() {
        return is_checkedout;
    }

    public void setIs_checkedout(int is_checkedout) {
        this.is_checkedout = is_checkedout;
    }

    public int getIs_returned() {
        return is_returned;
    }

    public void setIs_returned(int is_returned) {
        this.is_returned = is_returned;
    }

    public LocalDateTime getCreate_at() {
        return create_at;
    }

    public void setCreate_at(LocalDateTime create_at) {
        this.create_at = create_at;
    }


    public order() {

    }
    @Override
    public String toString() {
        return "orders [" +
                "id=" + id +
                ", user_id=" + user_id +
                ", book_id=" + book_id +
                ", pickup_date=" + pickup_date +
                ", pickup_time=" + pickup_time +
                ", pickup_time_end=" + pickup_time_end +
                ", is_checkedout=" + is_checkedout +
                ", is_returned=" + is_returned +
                ", create_at=" + create_at + "]";
    }
}
