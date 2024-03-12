package com.angular.springboot.foodrecipe.controllers;

import com.angular.springboot.foodrecipe.Repositories.UserRepository;
import com.angular.springboot.foodrecipe.wrappers.AuthResponse;
import com.angular.springboot.foodrecipe.wrappers.LoginRequest;
import com.angular.springboot.foodrecipe.jwt.JwtUtils;
import com.angular.springboot.foodrecipe.models.User;
import com.angular.springboot.foodrecipe.serviceImpl.AuthServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@PropertySource("classpath:application.properties")
@RequestMapping(path = "${endpoint.base}"+"/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthServiceImpl authServiceImpl;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtils jwtUtils;

    @PostMapping("/signup")
    public AuthResponse signup(@RequestBody User user) throws Exception {
        String email = user.getEmail();
        String password = user.getPassword();
        String fullName = user.getFullName();
        String profileImage = user.getProfileImage();

        User dbUser = userRepository.findByEmail(email);

        if(dbUser != null) {
            throw new Exception("Email already registered!");
        }

        User newUser = new User();
        newUser.setEmail(email);
        newUser.setPassword(passwordEncoder.encode(password));
        newUser.setFullName(fullName);
        newUser.setProfileImage(profileImage);

        User savedUser = userRepository.save(newUser);

        Authentication auth =
                new UsernamePasswordAuthenticationToken(
                        savedUser.getEmail(), savedUser.getPassword());
        //Adds user to the authenticated users' session.
        SecurityContextHolder.getContext().setAuthentication(auth);

        String token = jwtUtils.generateJwtToken(auth);

        return new AuthResponse(token, "Signup Success!");
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request) {

        Authentication auth = authServiceImpl.authenticate(
                request.getEmail(),
                request.getPassword()
        );

        //Adds user to the authenticated users' session or
        //replaced the existing session with the new session.
        SecurityContextHolder.getContext().setAuthentication(auth);
        String token = jwtUtils.generateJwtToken(auth);

        return new AuthResponse(token, "Login Success!");
    }
}
