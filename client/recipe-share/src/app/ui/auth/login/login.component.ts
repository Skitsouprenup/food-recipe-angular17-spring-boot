import { CommonModule } from '@angular/common';

import { 
  Component,
  Input,
  Output, 
  EventEmitter, 
  booleanAttribute 
} from '@angular/core';

import { 
  FormGroup, 
  FormControl, 
  Validators,
  ReactiveFormsModule 
} from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '@src/services/auth/auth-service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule, 
    ReactiveFormsModule, 
    MatButtonModule, 
    MatIconModule,
    MatInputModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  mQuery = window.matchMedia("(max-width: 400px)");

  constructor(private authService:AuthService) {}

  @Output() goToRegister = new EventEmitter<boolean>();
  @Input() hideLogin: boolean = false;

  initState = true

  //Hide login page
  goToRegisterPage() {
    this.goToRegister.emit(true);
    if(this.initState) this.initState = false
  }

  inputList: Array<Record<string, string>> = [
    {
      label: 'Email',
      name: 'email',
      for: 'email',
      model: 'email',
      type: 'text',
      placeholder: '',
      formControlName: 'email'
    },
    {
      label: 'Password',
      name: 'desc',
      for: 'desc',
      model: 'password',
      type: 'password',
      placeholder: '',
      formControlName: 'password'
    },
  ]

  //First parameter is the initial value of a form element
  //Second parameter is an array of validators
  loginForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("",[Validators.required])
  })

  loginUser() {
    const data = this.authService.login(this.loginForm.value, this.hideLogin)

    if(data != null) {
      const observable = data as Observable<unknown>
      
      observable.subscribe({
        next: (response) => {
          const res = response as { jwt:string }

          localStorage.setItem('jwt', res.jwt)
          this.authService.getUserInfo().subscribe()
          //console.log("Login Success!", res);
        }
      })
    }
  }
}
