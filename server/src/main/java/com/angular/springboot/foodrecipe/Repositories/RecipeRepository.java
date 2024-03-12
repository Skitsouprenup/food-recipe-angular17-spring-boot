package com.angular.springboot.foodrecipe.Repositories;

import com.angular.springboot.foodrecipe.models.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Long> {
}
