package com.api.abs.order;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


import java.sql.Time;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface orderRepository extends JpaRepository<order, Long> {

    @Query(nativeQuery=true,value= "SELECT * FROM ORDERS WHERE user_id=:user_id AND is_checkedout=1 OR is_returned=1")
    List<order> search(Long user_id);

    @Query(nativeQuery=true,value= "SELECT * FROM ORDERS WHERE user_id=:user_id AND is_checkedout=1")
    List<order> getCheckedoutOrders(Long user_id);

    @Query(nativeQuery=true,value= "SELECT * FROM ORDERS WHERE user_id=:user_id AND is_returned=1")
    List<order> getReturnedOrders(Long user_id);

    @Query(nativeQuery=true,value= "SELECT * FROM ORDERS WHERE user_id=:user_id AND is_checkedout=0")
    List<order> cart(Long user_id);

    @Query(nativeQuery=true,value= "SELECT * FROM ORDERS WHERE pickup_date=:date")
    List<order> searchByDate(LocalDate date);

    @Query(nativeQuery=true,value= "SELECT COUNT(*) FROM ORDERS WHERE pickup_date=:date AND pickup_time >=:startTime AND pickup_time_end <=:endTime ")
    Integer searchByTimeAndDate(LocalDate date, Time startTime, Time endTime);

    @Query(nativeQuery=true,value= "SELECT * FROM ORDERS WHERE pickup_time_end=:time OR pickup_time>:time")
    List<order> searchByTimeEnd(Time time);

    @Query(nativeQuery=true,value= "SELECT * FROM ORDERS WHERE user_id=:user_id AND id=:orderId")
    Optional<order> findByOrderIdUserId(Long user_id,Long orderId);
}
