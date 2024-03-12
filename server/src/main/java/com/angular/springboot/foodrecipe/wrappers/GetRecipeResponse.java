package com.angular.springboot.foodrecipe.wrappers;

import com.angular.springboot.foodrecipe.models.Recipe;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class GetRecipeResponse {
    private Recipe recipe;
    private boolean likedByUser;
}
