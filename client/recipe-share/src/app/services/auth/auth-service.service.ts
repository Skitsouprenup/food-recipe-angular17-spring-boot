import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:4000/api/v1/auth'

  constructor(private http:HttpClient) { }

  authSubject = new BehaviorSubject<unknown>({
    user: null
  })

  login(userData:unknown, isHidden:boolean):unknown{
    if(isHidden) return null

    return this.http.post<unknown>(`${this.baseUrl}/login`, userData)
  }

  register(userData:unknown, isHidden:boolean):unknown{
    if(isHidden) return null

    return this.http.post<unknown>(`${this.baseUrl}/signup`, userData)
  }

  getUserInfo():Observable<unknown>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('jwt')}`
    })
    return this.http.get<unknown>(
      `http://localhost:4000/api/v1/users/profile`, 
      {headers}
    ).
    pipe(
      //Update authSubject once user info
      //in the database is acquired
      tap((user) => {
        const current:Object = 
          this.authSubject.value as Object
        this.authSubject.next({...current, user})
      })
    )
  }

  logout() {
    localStorage.clear();
    this.authSubject.next({})
  }

}
