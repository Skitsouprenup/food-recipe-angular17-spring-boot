package com.angular.springboot.foodrecipe.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.LinkedList;
import java.util.List;

@Getter
@Setter
@Entity
public class Recipe {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String title;
    @ManyToOne
    private User user;
    private String image;
    private String description;
    private boolean isVegetarian;
    private LocalDateTime createdAt;
    //Collection of user's id that liked a recipe
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private List<Long> likes = new LinkedList<>();
    @Column(columnDefinition = "TEXT")
    private String recipeLink;
}
