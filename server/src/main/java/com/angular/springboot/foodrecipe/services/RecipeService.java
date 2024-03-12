package com.angular.springboot.foodrecipe.services;

import com.angular.springboot.foodrecipe.models.Recipe;
import com.angular.springboot.foodrecipe.models.User;

import java.util.List;

public interface RecipeService {

    public Recipe createRecipe(User user, Recipe recipe);
    public Recipe getRecipeById(Long id) throws Exception;
    public void deleteRecipe(Long id) throws Exception;
    public Recipe updateRecipe(Recipe recipe, Long id);
    public List<Recipe> findAllRecipe();
    public Recipe likeRecipe(Long id, User user);
}
