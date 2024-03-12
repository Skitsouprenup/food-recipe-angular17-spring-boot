package com.angular.springboot.foodrecipe.controllers;

import com.angular.springboot.foodrecipe.models.User;
import com.angular.springboot.foodrecipe.services.RecipeService;
import com.angular.springboot.foodrecipe.services.UserService;
import com.angular.springboot.foodrecipe.wrappers.GetRecipeResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.web.bind.annotation.*;

import com.angular.springboot.foodrecipe.models.Recipe;

import java.util.ArrayList;
import java.util.List;

@RestController
@PropertySource("classpath:application.properties")
@RequestMapping(path = "${endpoint.base}"+"/recipes")
public class RecipeController {

    @Autowired
    private UserService userService;

    @Autowired
    private RecipeService recipeService;

    @PostMapping("")
    public GetRecipeResponse createRecipe(
            @RequestBody Recipe recipe,
            @RequestHeader("Authorization") String authToken
    ) {
        User user = userService.findUserByJwt(authToken);
        return new GetRecipeResponse(recipeService.createRecipe(user, recipe), false);
    }

    @PutMapping("/{recipeId}")
    public GetRecipeResponse updateRecipe(
            @RequestBody Recipe recipe,
            @PathVariable Long recipeId,
            @RequestHeader("Authorization") String authToken
    ) {
        User user = userService.findUserByJwt(authToken);
        Recipe updated = recipeService.updateRecipe(recipe, recipeId);
        return new GetRecipeResponse(updated, updated.getLikes().contains(user.getId()));
    }

    @PatchMapping("/like/{recipeId}")
    public GetRecipeResponse likeRecipe(
            @PathVariable("recipeId") Long recipeId,
            @RequestHeader("Authorization") String authToken
    ) {
        User user = userService.findUserByJwt(authToken);
        Recipe recipe = recipeService.likeRecipe(recipeId, user);
        return new GetRecipeResponse(recipe, recipe.getLikes().contains(user.getId()));
    }

    @GetMapping("/{userId}")
    public List<GetRecipeResponse> getAllRecipe(@PathVariable("userId") Long id) {
        List<GetRecipeResponse> recipes = new ArrayList<>();

        for(Recipe recipe : recipeService.findAllRecipe()) {
            recipes.add(
                    new GetRecipeResponse(
                            recipe,
                            recipe.getLikes().contains(id)
                    )
            );
        }
        return recipes;
    }

    @DeleteMapping("/{id}")
    public List<String> deleteRecipe(@PathVariable("id") Long id) throws Exception {
        recipeService.deleteRecipe(id);
        return List.of("Recipe Deleted Successfully!");
    }
}
