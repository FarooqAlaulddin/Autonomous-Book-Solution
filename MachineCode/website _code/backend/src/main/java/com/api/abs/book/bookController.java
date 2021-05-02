package com.api.abs.book;

import com.api.abs.comment.comment;
import com.api.abs.likee.likee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "abs/books")
public class bookController {

    private final bookService bookService;

    @Autowired
    public bookController(bookService bookService) {
        this.bookService = bookService;
    }



    @GetMapping
    public List<book> getAllBooks(){
        return bookService.getAllBooks();
    }

    @GetMapping(path = "{bookId}")
    public Optional<book> getBook(@PathVariable("bookId") Long id){
        return bookService.getBookByID(id);
    }

    @PostMapping(path = "{bookId}/addcomment")
    public List<comment> AddCommentBook(@PathVariable("bookId") Long id, @RequestBody comment comment){
        return bookService.addCommentBook(id,comment);
    }

    @PostMapping(path = "{bookId}/like/{userId}")
    public List<likee> AddLikeBook(@PathVariable("bookId") Long id, @PathVariable("userId") Long userId){
        List<likee> likes = bookService.handleLikeBook(id,userId);
        return likes;
    }

    @GetMapping("/available")
    public List<book> getAvailableBooks(){
        return bookService.getAvailableBooks();
    }

    @PostMapping("/add/book")
    public void AddNewBook(@RequestBody book book){
        bookService.addNewBook(book);
    }

    @PostMapping("/add/collection")
    public void AddNewCollection(@RequestBody List<book> books){
        bookService.addNewCollection(books);
    }


    @GetMapping("user/{userId}/info/comments")
    public List<comment> comments(@PathVariable("userId") Long userId){
        return bookService.getUserInfoComments(userId);
    }

    @GetMapping("user/{userId}/info/likes")
    public Integer likes(@PathVariable("userId") Long userId){
        return bookService.getUserInfoLikes(userId);
    }
}
