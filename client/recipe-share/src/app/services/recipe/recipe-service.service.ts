import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

import { recipeType, subjectType } from '@src/types/types';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private baseUrl = 'http://localhost:4000/api/v1/recipes'

  constructor(private http:HttpClient) { }

  recipeSubject = new BehaviorSubject<subjectType>({
    recipes: [],
    loading: false,
    newRecipe: null
  })

  private getHeaders():HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('jwt')}`
    })
  }

  getRecipes(id:string):Observable<unknown> {

    const headers = this.getHeaders()
    return this.http.get<unknown>(`${this.baseUrl}/${id}`, {headers}).
    pipe(
      tap((recipes) => {
        //console.log(recipes)
        const fetched = recipes as Array<recipeType>

        const current:subjectType = 
          this.recipeSubject.value as subjectType
        this.recipeSubject.next({
          ...current, 
          recipes: fetched
        })
      })
    )
  }

  createRecipe(recipe:unknown):Observable<unknown> {
    const headers = this.getHeaders()
    return this.http.post<unknown>(
      `${this.baseUrl}`, 
      recipe, 
      {headers}
    ).
    pipe(
      tap((newRecipe: unknown) => {
        const current:subjectType = 
          this.recipeSubject.value as subjectType
        this.recipeSubject.next({
          ...current, 
          recipes: [
            ...current.recipes, newRecipe as recipeType
          ]
        })
      })
    )
  }

  updateRecipe(recipeId: string, recipe:Record<string, unknown>):Observable<unknown> {
    const headers = this.getHeaders()
    return this.http.put<unknown>(
      `${this.baseUrl}/${recipeId}`, 
      recipe, 
      {headers}
    ).
    pipe(
      tap((updatedRecipe: unknown) => {
        const current = this.recipeSubject.value
        const updated: Array<recipeType> = current.recipes.map((item:recipeType) => {
          //Only extract id. Any values of these variable
          //won't be modified.
          const recipeUpdated = updatedRecipe as recipeType
          return item?.recipe?.id === 
            recipeUpdated.recipe?.id ? recipeUpdated : item
        })

        this.recipeSubject.next({...current, recipes: updated})
      })
    )
  }

  deleteRecipe(id: string):Observable<unknown> {
    const headers = this.getHeaders()
    return this.http.delete<unknown>(
      `${this.baseUrl}/${id}`, 
      {headers},
    ).
    pipe(
      tap(() => {
        const current = this.recipeSubject.value
        const deleted: Array<recipeType> = 
          current.recipes.filter((item:recipeType) => {
            const currentItem = item as recipeType

            return currentItem.recipe?.id !== id 
          })
        //console.log(deleted)
        this.recipeSubject.next({...current, recipes: deleted})
      })
    )
  }

  likeRecipe(recipeId:string):Observable<unknown> {
    const headers = this.getHeaders()
    return this.http.patch<unknown>(
      `${this.baseUrl}/like/${recipeId}`,
      {},{headers}
    ).
    pipe(
      tap((updatedRecipe: unknown) => {
        const current = this.recipeSubject.value
        const updated: Array<recipeType> = 
          current.recipes.map((item:recipeType) => {
            //Only extract id. Any values of these variable
            //won't be modified.
            const currentItem = item as recipeType
            const recipeUpdated = updatedRecipe as recipeType

            return currentItem?.recipe?.id === 
              recipeUpdated.recipe?.id ? recipeUpdated : item
          })

        this.recipeSubject.next({...current, recipes: updated})
      })
    )
  }

}
