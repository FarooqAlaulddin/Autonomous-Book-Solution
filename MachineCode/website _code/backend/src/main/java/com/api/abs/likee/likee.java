package com.api.abs.likee;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;


@Entity
@Table
public class likee {

    @Id
    @GeneratedValue
    private Long id;

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "user_id")
    private Long userId;

    @CreationTimestamp
    private LocalDateTime CreateAt;

    public likee() {
    }

    public likee(Long userId) {
        this.userId = userId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
