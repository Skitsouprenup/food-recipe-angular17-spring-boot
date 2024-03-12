package com.angular.springboot.foodrecipe.services;

import com.angular.springboot.foodrecipe.models.User;

public interface UserService {

    User findUserById(Long id) throws Exception;
    User findUserByJwt(String jwt);
}
