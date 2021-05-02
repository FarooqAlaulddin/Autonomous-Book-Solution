package com.api.abs.comment;

import com.api.abs.book.book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface commentRepository extends JpaRepository<comment,Long> {

    @Query(nativeQuery=true,value= "SELECT * FROM COMMENT WHERE user_id=:userId")
    List<comment> findByUserId(Long userId);
}
