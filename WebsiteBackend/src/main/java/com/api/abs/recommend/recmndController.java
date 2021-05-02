package com.api.abs.recommend;

import com.api.abs.book.book;
import com.api.abs.book.bookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "abs")
public class recmndController {
    private final recmndBooks recmndBooks;

    @Autowired
    public recmndController(recmndBooks recmndBooks) {

        this.recmndBooks = recmndBooks;
    }
    //Get previous order of the user
    @GetMapping(path ="/recommendation/{userId}")
    public List<book> get(@PathVariable Long userId) {
        return recmndBooks.signedInUser(userId);
    }
}
