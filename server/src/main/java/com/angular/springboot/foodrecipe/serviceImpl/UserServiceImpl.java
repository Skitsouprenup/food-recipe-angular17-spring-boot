package com.angular.springboot.foodrecipe.serviceImpl;

import com.angular.springboot.foodrecipe.Repositories.UserRepository;
import com.angular.springboot.foodrecipe.jwt.JwtUtils;
import com.angular.springboot.foodrecipe.models.User;
import com.angular.springboot.foodrecipe.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtils jwtUtils;

    @Override
    public User findUserById(Long id) throws Exception {
        Optional<User> opt = userRepository.findById(id);

        if(opt.isPresent()) {
            return opt.get();
        }

        throw new Exception("Can't find User!");
    }

    @Override
    public User findUserByJwt(String jwt) {
        String email = jwtUtils.getEmailClaim(jwt);

        if(email == null)
            throw new BadCredentialsException("Invalid Token");

        User user = userRepository.findByEmail(email);

        if(user == null)
            throw new UsernameNotFoundException("User not Found!");

        return user;
    }
}
