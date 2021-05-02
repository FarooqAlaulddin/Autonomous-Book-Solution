// 2
// JWTUserDetailsService implements the Spring Security UserDetailsService interface.
// It overrides the loadUserByUsername for fetching user details from the database using the username.
// The Spring Security Authentication Manager calls this method for getting the user details
// from the database when authenticating the user details provided by the user.


package com.api.abs.jwt;


import com.api.abs.user.DAOUser;
import com.api.abs.user.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class JwtUserDetailsService implements UserDetailsService {

    @Autowired
    private UserDao userDao;


    @Autowired
    private PasswordEncoder bcryptEncoder;

    @Override
    public UserDetails loadUserByUsername(String email){
        DAOUser user = userDao.findByEmail(email);
        if (user == null) {
            throw new IllegalStateException("User not found with Email: " + email);
        }
        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(),
                new ArrayList<>());
    }

    public Long save(DAOUser user){
        DAOUser userOptional= userDao.findByEmail(user.getEmail());
        if(userOptional != null){
            throw new IllegalStateException("EMAIL TAKEN");
        }
        //DAOUser newUser = new DAOUser();
        //newUser.setEmail(user.getEmail());
        user.setPassword(bcryptEncoder.encode(user.getPassword()));
        userDao.save(user);

        return user.getId();
    }
}