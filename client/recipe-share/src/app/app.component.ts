import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { NavbarComponent } from './ui/navbar/navbar.component';
import { RecipeCardComponent } from './ui/recipe-card/recipe-card.component';
import { FooterComponent } from './ui/footer/footer.component';
import { CreateRecipeFormComponent } from './ui/dialogs/create-recipe-form/create-recipe-form.component';
import { AuthComponent } from '@src/ui/auth/auth.component';
import { AuthService } from './services/auth/auth-service.service';
import { RecipeService } from './services/recipe/recipe-service.service';

import { recipeType, userInfoType } from '@src/types/types';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    RecipeCardComponent,
    FooterComponent,
    CreateRecipeFormComponent,
    AuthComponent,
    MatIconModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'recipe-share';

  initLoading:boolean = true

  user: userInfoType = {
    email: '',
    fullName: '',
    id: '',
    profileImage: ''
  }

  constructor(
    private authService:AuthService,
    private recipeService:RecipeService
  ) {

  }

  recipes: Array<recipeType> | null = null

  ngOnInit() {
    this.authService.getUserInfo().subscribe()
    
    //Subscribe in order to acquire the value in
    //the last next() execution of authSubject.
    //next() is executed previously in getInfo()
    this.authService.authSubject.subscribe({

      next: (auth) => {
        const subj = auth as {user:userInfoType}
        //console.log("Test: ", subj.user)
        this.user = subj.user

        //Initially subj.user could be null. This happens
        //because this observable is executed first and
        //authSubject is not setup.
        if(subj.user === null) {
          this.initLoading = false
          return;
        }

        this.recipeService.getRecipes(subj.user?.id).subscribe()

        //Subscribe in order to acquire the value in
        //the last next() execution of recipeSubject.
        //next() is executed previously in getRecipes()
        this.recipeService.recipeSubject.subscribe({
          next: (data) => {
            this.initLoading = false
            //console.log(data.recipes)
            this.recipes = data.recipes as Array<recipeType>
          },
          error: () => this.initLoading = false,
          complete: () => this.initLoading = false
        })
      },
      error: () => this.initLoading = false,
      complete: () => this.initLoading = false
    })

  }
}
