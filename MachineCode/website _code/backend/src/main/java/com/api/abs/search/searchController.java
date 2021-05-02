package com.api.abs.search;

import com.api.abs.book.book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "abs")
public class searchController {

    private final searchService searchService;
    @Autowired
    public searchController(com.api.abs.search.searchService searchService) {
        this.searchService = searchService;
    }

    @PostMapping("/search")
    public List<book> searchKeywords(@Param("keyword") String keyword){
        List<book> bookList = searchService.searchByKeywords(keyword);
        return bookList;
    }
}
