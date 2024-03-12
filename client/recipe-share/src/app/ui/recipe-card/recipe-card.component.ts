import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { MatIconModule } from '@angular/material/icon';
import { RecipeService } from '@src/services/recipe/recipe-service.service';
import { recipeType, userInfoType } from '@src/types/types';

import { UpdateRecipeFormComponent } from '@src/ui/dialogs/update-recipe-form/update-recipe-form.component';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [
    MatCardModule, 
    MatButtonModule,
    MatIconModule,
    UpdateRecipeFormComponent,
  ],
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss']
})
export class RecipeCardComponent {
  @Input() recipeInput: recipeType | null = null
  @Input() userId: unknown = null

  constructor(private recipeService:RecipeService) {}

  truncateDesc() {
    if(this.recipeInput?.recipe?.description === null) {
      return ''
    }

    const description = this.recipeInput?.recipe?.description as string;

    if(description.length > 235) {
      return description.substring(0, 234).concat('...')
    }
    return description
  }

  deleteRecipe() {
    this.recipeService.deleteRecipe(
      this.recipeInput?.recipe?.id as string
    ).subscribe()
  }

  likeRecipe() {
    this.recipeService.likeRecipe(
      this.recipeInput?.recipe?.id as string
    ).subscribe()
  }

  goToRecipeLink() {
    window.open(this.recipeInput?.recipe?.recipeLink);
  }
}
