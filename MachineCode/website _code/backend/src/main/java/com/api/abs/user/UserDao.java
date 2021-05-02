package com.api.abs.user;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserDao extends CrudRepository<DAOUser, Long> {

    DAOUser findByEmail(String email);

    DAOUser findUserById(Long id);

}