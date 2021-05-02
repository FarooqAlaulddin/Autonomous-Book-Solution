package com.api.abs.comment;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class commentService {

    private commentRepository commentRepository;

    @Autowired
    public commentService(commentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

//    public Long addComment(comment comment){
//        comment newComment = commentRepository.save(comment);
//        if(newComment.getId() == null) throw new IllegalStateException("ERROR WHILE ADDING NEW COMMENT");
//        return newComment.getId();
//    }

    public List<comment> findByUserId(Long UserId){
        return commentRepository.findByUserId(UserId);
    }




}
