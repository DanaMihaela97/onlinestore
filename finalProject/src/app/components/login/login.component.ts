import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { userRequest } from 'src/app/services/userRequest';

import { UserModel } from '../register/user.model';
import { UserLogin } from './userlogin.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  signUpForm!: FormGroup;
  user !: UserLogin;
  token = {
    "iat": "",
    "exp": "",
    "sub": "",
    "role": ""
  };
  userForm: userRequest = new userRequest();
  constructor(private formBuilder: FormBuilder,
    private router: Router, private api: ApiService) { }
  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      email: [],
      password: []
    })
  }
  parseJwt(token: String) {
    return JSON.parse(atob(token.split('.')[1]));
  }
  signUp() {
    this.userForm.email = this.signUpForm.value.email
    this.userForm.password = this.signUpForm.value.password
    this.api.signIn(this.userForm).subscribe({
      next: (res) => {
        this.token = this.parseJwt(res.token)
        this.api.getUser(this.token.sub).subscribe({next: (resUser: UserLogin)=>{
          this.user = resUser
          console.log(this.user)
          if (this.user.email == this.userForm.email) {
            window.localStorage.clear()
            window.localStorage.setItem("email", this.user.email)
            window.localStorage.setItem("fullName", this.user.name)
            window.localStorage.setItem("role", this.token.role)
            window.localStorage.setItem("authenticated", "true")
            window.localStorage.setItem("jwt", res.token)
            this.signUpForm.reset();
            this.router.navigate(['']).then(() => {
              window.location.reload();
            })
          }
        }})
      },
      error: () => {
        alert("Email/password combination is wrong!")
        this.signUpForm.get("password")?.reset();
      }
    })
   
  }
}





