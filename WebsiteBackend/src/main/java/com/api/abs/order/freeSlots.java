package com.api.abs.order;

import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalTime;

public class freeSlots {

    private LocalDate date;
    private LocalTime pickup_time;
    private LocalTime pickup_time_end;
    private Integer Taken = 0;


    public freeSlots() {

    }

    public freeSlots(LocalDate date) {
        this.date = date;
    }

    public freeSlots(LocalTime pickup_time, LocalTime pickup_time_end) {
        this.pickup_time = pickup_time;
        this.pickup_time_end = pickup_time_end;
    }

    public freeSlots(LocalDate date, LocalTime pickup_time, LocalTime pickup_time_end) {
        this.date = date;
        this.pickup_time = pickup_time;
        this.pickup_time_end = pickup_time_end;
    }


    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public LocalTime getPickup_time() {
        return pickup_time;
    }

    public void setPickup_time(LocalTime pickup_time) {
        this.pickup_time = pickup_time;
    }

    public LocalTime getPickup_time_end() {
        return pickup_time_end;
    }

    public void setPickup_time_end(LocalTime pickup_time_end) {
        this.pickup_time_end = pickup_time_end;
    }

    public Integer getTaken() {
        return Taken;
    }

    public void setTaken(Integer taken) {
        Taken = taken;
    }
}
