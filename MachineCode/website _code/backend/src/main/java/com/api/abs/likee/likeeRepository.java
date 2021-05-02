package com.api.abs.likee;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface likeeRepository extends JpaRepository<likee, Long>{

    @Query(nativeQuery=true,value= "SELECT count(*) FROM Likee WHERE user_id=:userId")
    Integer findByUserId(Long userId);
}

