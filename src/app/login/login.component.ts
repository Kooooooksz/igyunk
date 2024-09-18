import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  logInForm = new FormGroup({
    email:  new FormControl(""),
    password: new FormControl(""),
  })

  constructor(private authService: AuthService){}

  onSubmit(){
    this.authService.login(this.logInForm.get("email")?.value as string, this.logInForm.get("password")?.value as string);
  }


}
