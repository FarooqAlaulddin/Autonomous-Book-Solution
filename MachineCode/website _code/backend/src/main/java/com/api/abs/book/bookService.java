package com.api.abs.book;

import com.api.abs.comment.comment;
import com.api.abs.comment.commentService;
import com.api.abs.likee.likee;
import com.api.abs.likee.likeeRepository;
import com.api.abs.user.DAOUser;
import com.api.abs.user.userService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class bookService {

    private final bookRepository bookRepository;

    @Autowired
    commentService commentService;

    @Autowired
    userService userService;

    @Autowired
    likeeRepository likeeRepository;


    @Autowired
    public bookService(bookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public book findByBookId(Long bookID) {
        return bookRepository.findBookById(bookID);
    }

    public void addNewBook(book book){
        Optional<book> bookOptional = bookRepository.findBookByISBN(book.getISBN());

        if(bookOptional.isPresent()){
            throw new IllegalStateException("ISBN TAKEN");
        }
        bookRepository.save(book);
    }

    public void addNewCollection(List<book> books){
        try {
            bookRepository.saveAll(books);
        } catch (Exception e){
            throw new IllegalStateException("DATA NOT SAVED - ERROR: " + e);
        }
    }

    public List<comment> addCommentBook(Long id, comment comment) {
        Optional<book> book = this.getBookByID(id);

        if(book.isEmpty()){
            throw new IllegalStateException("CAN NOT FIND BOOK WITH ID: " + id);
        }

        DAOUser user = userService.getUserById(comment.getUserId());

        if(user == null){
            throw new IllegalStateException("CAN NOT FIND USER WITH ID: " + comment.getUserId());
        }

        comment.setUserName(user.getFname()+' '+user.getLname());

        book.get().getComments().add(comment);
        bookRepository.save(book.get());

        return book.get().getComments();
    }

    public List<likee> handleLikeBook(Long id, Long userId){
        Optional<book> book = this.getBookByID(id);

        if(book.isEmpty()){
            throw new IllegalStateException("CAN NOT FIND BOOK WITH ID: " + id);
        }

        DAOUser user = userService.getUserById(userId);

        if(user == null){
            throw new IllegalStateException("CAN NOT FIND USER WITH ID: " + userId);
        }


        List<likee> checkLikeList = book.get().getLikes();
        boolean found = false;
        for(likee like : checkLikeList) {
            if(like.getUserId() == userId) {
                book.get().getLikes().remove(like);
                bookRepository.save(book.get());
                found = true;
                break;
                //throw new IllegalStateException("REMOVE LIKE");
            }
        }

        if(!found){
            likee newLike = new likee(userId);
            book.get().getLikes().add(newLike);
            bookRepository.save(book.get());
            //throw new IllegalStateException("ADD LIKE");

        }

        Optional<book> bookupdated = this.getBookByID(id);

        return bookupdated.get().getLikes();
    }

    public List<book> getAllBooks(){
        List<book> books =  bookRepository.findAll();

        if(books.isEmpty()){
            throw new IllegalStateException("NO BOOKS FOUND");
        }else {
            return books;
        }
    }

    public Optional<book> getBookByID(Long id){
        Optional<book> book =  bookRepository.findById(id);

        if(book.isEmpty()){
            throw new IllegalStateException("BOOK NOT FOUND");
        }else {

//            for(comment comment: book.get().getComments()){
//                DAOUser user = userService.getUserById(comment.getUserId());
//            }

            return book;
        }
    }

    public List<book> getAvailableBooks() {
        List<book> books = bookRepository.findAvailableBooks();
        return books;
    }

    //for updating the book quantity
    public void updateBookQuantity(Long id, int status) {
        Optional<book> book  =  bookRepository.findById(id);
        if(book.isPresent()) {
            book bookQuantity = book.get();
            if(bookQuantity.getQuantity()>0) {
                if(status==-1) {
                    bookQuantity.setQuantity(bookQuantity.getQuantity() - 1);
                    bookRepository.save(bookQuantity);
                }else if(status==1){
                    bookQuantity.setQuantity(bookQuantity.getQuantity() + 1);
                    bookRepository.save(bookQuantity);
                }
            }else {
                throw new IllegalStateException("Copies of the book are NOT available, please try again later");
            }
        }else {
            throw new IllegalStateException("BOOK NOT FOUND");
        }
    }

    public List<comment> getUserInfoComments(Long userId) {
        return commentService.findByUserId(userId);
    }

    public Integer getUserInfoLikes(Long userId) {
        return likeeRepository.findByUserId(userId);
    }
}
