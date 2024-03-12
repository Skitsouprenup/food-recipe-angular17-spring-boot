package com.angular.springboot.foodrecipe.controllers;

import com.angular.springboot.foodrecipe.models.User;
import com.angular.springboot.foodrecipe.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.context.annotation.PropertySource;


@RestController
@PropertySource("classpath:application.properties")
@RequestMapping(path = "${endpoint.base}"+"/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/profile")
    public User findUserByJwt(@RequestHeader("Authorization") String authToken) {
        return userService.findUserByJwt(authToken);
    }
}
