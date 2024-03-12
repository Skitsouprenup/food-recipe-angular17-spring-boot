package com.angular.springboot.foodrecipe.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.annotation.Nullable;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class User {

    @Id
    //equal to @GeneratedValue (strategy = GenerationType.AUTO)
    @GeneratedValue
    private Long id;

    @Column(unique = true)
    private String email;

    //@JsonProperty is an annotation that's used to
    //relate a field to a JSON request body or response.
    //In this case, @JsonProperty is used to restrict
    //the password field to be included in JSON response
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;
    private String fullName;
    private String profileImage;
}
