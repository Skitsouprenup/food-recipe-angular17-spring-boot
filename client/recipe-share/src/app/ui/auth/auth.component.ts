import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { LoginComponent } from '@src/ui/auth/login/login.component';
import { RegisterComponent } from '@src/ui/auth/register/register.component';


@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, LoginComponent, RegisterComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  hideLoginPage = false;

  showRegisterPage(value: boolean) {
    this.hideLoginPage = value;
  }

}
