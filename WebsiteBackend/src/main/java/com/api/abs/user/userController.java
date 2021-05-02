package com.api.abs.user;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "auth/isLoggedIn")
public class userController {

    @GetMapping
    public boolean isLoggedIn(){
        return true;
    }

}
