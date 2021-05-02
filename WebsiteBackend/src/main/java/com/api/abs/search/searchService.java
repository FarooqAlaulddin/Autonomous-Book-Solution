package com.api.abs.search;

import com.api.abs.book.book;
import com.api.abs.book.bookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class searchService {

    private final bookRepository bookRepository;

    @Autowired
    public searchService(bookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public List<book> searchByKeywords(String keyword){
        if(keyword!=null){

            return bookRepository.findByKeywords(keyword);
        }else{
            return bookRepository.findAvailableBooks();
        }
    }
}
