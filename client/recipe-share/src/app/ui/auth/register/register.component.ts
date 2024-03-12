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

import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '@src/services/auth/auth-service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule, 
    ReactiveFormsModule, 
    MatButtonModule, 
    MatIconModule,
    MatInputModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  mQuery = window.matchMedia("(max-width: 400px)");

  @Output() goToLogin = new EventEmitter<boolean>();
  @Input() hideLogin: boolean = false;

  constructor(private authService:AuthService) {}

  //Hide register page
  goToLoginPage() {
    this.goToLogin.emit(false);
  }

  //Register form controls here
  //First parameter is the initial value of a form element
  //Second parameter is an array of validators
  registrationForm = new FormGroup({
    fullName: new FormControl("",[Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("",[Validators.required, Validators.minLength(7)]),
    confirmPass: new FormControl("",[Validators.required, Validators.minLength(7)]),
    profileImage: new FormControl()
  })

  inputList: Array<Record<string, string>> = [
    {
      label: 'Full name',
      name: 'fullname',
      for: 'fullname',
      model: 'fullName',
      type: 'text',
      placeholder: '',
      formControlName: 'fullName'
    },
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
      name: 'password',
      for: 'password',
      model: 'password',
      type: 'password',
      placeholder: '',
      formControlName: 'password'
    },
    {
      label: 'Confirm Password',
      name: 'confirmpass',
      for: 'confirmpass',
      model: 'confirmPass',
      type: 'password',
      placeholder: '',
      formControlName: 'confirmPass'
    },
    {
      label: 'Profile Image URL',
      name: 'image',
      for: 'image',
      model: "image",
      placeholder: '',
      formControlName: 'profileImage'
    },
  ]

  registerUser() {

    if(
      this.registrationForm.value.password !==
      this.registrationForm.value.confirmPass
    ) {
      alert("Password and Confirm Password doesn't match")
      return
    }

    const data = 
      this.authService.register(this.registrationForm.value, !this.hideLogin)

    if(data != null) {
      const observable = data as Observable<unknown>
      
      observable.subscribe({
        next: (response) => {
          const res = response as { jwt:string }

          localStorage.setItem('jwt', res.jwt)
          this.authService.getUserInfo().subscribe()
          //console.log("Register Success!", res);
        }
      })
    }
  }
}
