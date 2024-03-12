import {Component} from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose, 
  MatDialogTitle, 
  MatDialogContent
} from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';

import {MatRadioModule} from '@angular/material/radio';
import { RecipeService } from '@src/services/recipe/recipe-service.service';

@Component({
  selector: 'app-create-recipe-form',
  standalone: true,
  templateUrl: './create-recipe-form.component.html',
  styleUrls: ['./create-recipe-form.component.scss'],
  imports: [MatButtonModule, MatIconModule]
})
export class CreateRecipeFormComponent {
  constructor(private dialog: MatDialog) {
  
}

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(CreateRecipeFormDialog, {
      width: '450px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}

@Component({
  selector: 'create-recipe-form-dialog',
  templateUrl: './create-recipe-form-dialog.html',
  styleUrls: ['./create-recipe-form.component.scss'],
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
export class CreateRecipeFormDialog {
  //MatDialogRef is an active instance of MatDialog.
  constructor(
    private dialogRef: MatDialogRef<CreateRecipeFormDialog>,
    private recipeService:RecipeService
  ) {}

  inputList: Array<Record<string, string>> = [
    {
      label: 'Title',
      name: 'title',
      for: 'title',
      model: "title",
      type:'text',
      placeholder: 'Ex. Burger Recipe'
    },
    {
      label: 'Desciption',
      name: 'desc',
      for: 'desc',
      model: "description",
      type:'textarea',
      placeholder: ''
    },
    {
      label: 'Recipe Image URL',
      name: 'image',
      for: 'image',
      model: "image",
      type:'text',
      placeholder: ''
    },
    {
      label: 'Recipe Link',
      name: 'link',
      for: 'link',
      model: "recipeLink",
      type:'text',
      placeholder: ''
    },
  ]

  recipeItem: Record<string, string> = {
    title: '',
    description: '',
    vegetarian: 'false',
    image: '',
    recipeLink: ''
  }

  submitForm() {
    this.recipeService.createRecipe(this.recipeItem).subscribe({
      next: (_data) => {
        this.dialogRef.close()
        //console.log('Created Recipe', data)
      }
    })
  }
}
