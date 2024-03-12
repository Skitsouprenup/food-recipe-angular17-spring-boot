package com.angular.springboot.foodrecipe.serviceImpl;

import com.angular.springboot.foodrecipe.Repositories.RecipeRepository;
import com.angular.springboot.foodrecipe.models.Recipe;
import com.angular.springboot.foodrecipe.models.User;
import com.angular.springboot.foodrecipe.services.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class RecipeServiceImpl implements RecipeService {
    @Autowired
    private RecipeRepository recipeRepository;

    @Override
    public Recipe createRecipe(User user, Recipe recipe) {

        Recipe newRecipe = new Recipe();
        newRecipe.setTitle(recipe.getTitle());
        newRecipe.setImage(recipe.getImage());
        newRecipe.setDescription(recipe.getDescription());
        newRecipe.setUser(user);
        newRecipe.setCreatedAt(LocalDateTime.now());
        newRecipe.setVegetarian(recipe.isVegetarian());
        newRecipe.setRecipeLink(recipe.getRecipeLink());

        return recipeRepository.save(newRecipe);
    }

    @Override
    public Recipe getRecipeById(Long id) throws Exception {
        Optional<Recipe> opt = recipeRepository.findById(id);

        if(opt.isPresent()) {
            return opt.get();
        }

        throw new Exception("Can't find recipe!");
    }

    @Override
    public void deleteRecipe(Long id) throws Exception {
        getRecipeById(id);

        recipeRepository.deleteById(id);
    }

    @Override
    public Recipe updateRecipe(Recipe recipe, Long id) {
        Recipe record = recipeRepository.findById(id).get();

        if(recipe != null) {
            record.setTitle(recipe.getTitle());
            record.setUser(recipe.getUser());
            record.setImage(recipe.getImage());
            record.setDescription(recipe.getDescription());
            record.setVegetarian(recipe.isVegetarian());
            record.setRecipeLink(recipe.getRecipeLink());
        }

        return recipeRepository.save(record);
    }

    @Override
    public List<Recipe> findAllRecipe() {

        return recipeRepository.findAll();
    }

    @Override
    public Recipe likeRecipe(Long id, User user) {
        Recipe record = recipeRepository.findById(id).get();

        if(record.getLikes().contains(user.getId())) {
            record.getLikes().remove(user.getId());
        }
        else {
            record.getLikes().add(user.getId());
        }

        return recipeRepository.save(record);
    }
}
