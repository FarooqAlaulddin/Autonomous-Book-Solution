package com.api.abs.schedule;


import com.api.abs.book.book;
import com.api.abs.book.bookService;
import com.api.abs.user.DAOUser;
import com.api.abs.user.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class scheduleService {

    @Autowired
    UserDao userRepostiry;

    @Autowired
    bookService bookService;

    public List<book> getUserSchedule(Long id) throws IllegalStateException{
        Optional<DAOUser> userOptional = userRepostiry.findById(id);

        if(userOptional.isEmpty()){
            throw new IllegalStateException("CAN NOT FIND USER WITH ID: " + id);
        }

        if(userOptional.get().getBooks().isEmpty()){
            throw new IllegalStateException("CAN NOT FIND ANY BOOK ASSOCIATED USER WITH ID: " + id);
        }

        return userOptional.get().getBooks();
    }

    public void addBookToUser(Long id, Long bookId){

        Optional<DAOUser> userOptional = userRepostiry.findById(id);
        if(userOptional == null){
            throw new IllegalStateException("CAN NOT FIND USER WITH ID: " + id);
        }
        book book = bookService.findByBookId(bookId);
        if(book == null){
            throw new IllegalStateException("CAN NOT FIND BOOK WITH ID: " + bookId);
        }

        if(!userOptional.get().getBooks().contains(book)) {
            userOptional.get().getBooks().add(book);
            userRepostiry.save(userOptional.get());
        }else{
            throw new IllegalStateException("CAN NOT ADD BOOK WITH ID: " + bookId + ". ALREADY EXIST IN THE USER SCHEDULE.");
        }
        //return userOptional;

        //throw new IllegalStateException("BOOK WITH ID:" + bookId + "CAN NOT BE ADDED TO USER WITH ID:" + id);
    }

}
