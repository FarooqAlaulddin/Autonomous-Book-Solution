package com.api.abs.schedule;

import com.api.abs.book.book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path="abs/schedule")
public class scheduleController {

    @Autowired
    private final scheduleService scheduleService;

    public scheduleController(scheduleService scheduleService) {
        this.scheduleService = scheduleService;
    }

    @GetMapping(path="{userId}")
    public List<book> getUserSchedule(@PathVariable("userId") Long id){
        return scheduleService.getUserSchedule(id);
    }

    @PostMapping(path= "{userId}/addbook/{bookId}")
    public void addBookToUser(@PathVariable("userId") Long id, @PathVariable("bookId") Long bookId){
        scheduleService.addBookToUser(id,bookId);
    }

}
