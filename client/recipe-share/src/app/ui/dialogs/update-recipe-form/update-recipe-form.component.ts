import {Component, Inject, Input} from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose, 
  MatDialogTitle, 
  MatDialogContent,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';

import {MatRadioModule} from '@angular/material/radio';
import { RecipeService } from '@src/services/recipe/recipe-service.service';
import { recipeInfoType, recipeType } from '@src/types/types';

@Component({
  selector: 'app-update-recipe-form',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './update-recipe-form.component.html',
  styleUrl: './update-recipe-form.component.scss'
})
export class UpdateRecipeFormComponent {
  @Input() recipe:recipeType | null = null;

  constructor(public dialog: MatDialog) {}

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(UpdateRecipeFormDialog, {
      width: '450px',
      enterAnimationDuration,
      exitAnimationDuration,
      //Pass data to dialog
      data: {
        recipeInfo: this.recipe
      }
    });
  }
}


@Component({
  selector: 'update-recipe-form-dialog',
  templateUrl: './update-recipe-form-dialog.html',
  styleUrls: ['./update-recipe-form.component.scss'],
  standalone: true,
  imports: [
    MatButtonModule, 
    MatDialogActions, 
    MatDialogClose, 
    MatDialogTitle, 
    MatDialogContent,
    FormsModule, 
    MatFormFieldModule, 
    MatInputModule,
    MatRadioModule
  ],
})
export class UpdateRecipeFormDialog {
  //MatDialogRef is an active instance of MatDialog.
  constructor(
    public dialogRef: MatDialogRef<UpdateRecipeFormDialog>,
    private recipeService:RecipeService,
    //inject data object that holds a passed data
    //when open() function is executed
    @Inject(MAT_DIALOG_DATA) public data: { recipeInfo: recipeType }
  ) {}

  inputList: Array<Record<string, string>> = [
    {
      label: 'Title',
      name: 'title',
      for: 'title',
      model: "title",
      type: 'text',
      placeholder: 'Ex. Burger Recipe'
    },
    {
      label: 'Desciption',
      name: 'desc',
      for: 'desc',
      model: "description",
      type: 'textarea',
      placeholder: ''
    },
    {
      label: 'Image URL',
      name: 'image',
      for: 'image',
      model: "image",
      type: 'text',
      placeholder: ''
    },
    {
      label: 'Recipe Link',
      name: 'link',
      for: 'link',
      model: "recipeLink",
      type: 'text',
      placeholder: ''
    },
  ]

  recipeItem: Record<string, unknown> = {
    title: this.data.recipeInfo.recipe.title,
    description: this.data.recipeInfo.recipe.description,
    vegetarian: this.data.recipeInfo.recipe.vegetarian.toString(),
    image: this.data.recipeInfo.recipe.image,
    recipeLink: this.data.recipeInfo.recipe.recipeLink,
    user: this.data.recipeInfo.recipe.user
  }

  submitForm() {
    this.recipeService.updateRecipe(
      this.data.recipeInfo.recipe.id, 
      this.recipeItem
    ).subscribe(
      () => this.dialogRef.close()
    )
  }
}