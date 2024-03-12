package com.angular.springboot.foodrecipe.services;

import org.springframework.security.core.Authentication;

public interface AuthService {

    public Authentication authenticate(String username, String password);
}
