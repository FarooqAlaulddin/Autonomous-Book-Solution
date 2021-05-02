package com.api.abs.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class userService {

    @Autowired
    UserDao userRepository;

    public userService(UserDao userRepository) {
        this.userRepository = userRepository;
    }

    public DAOUser getUserById(Long userId) {
        return userRepository.findUserById(userId);
    }

    public Long getUserByEmail(String email){
        return userRepository.findByEmail(email).getId();
    }
}
