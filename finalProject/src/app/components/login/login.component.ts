import { HttpClient } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AddComponent } from '../add/add.component';
import { UserModel } from '../register/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  signUpForm!: FormGroup;
  user !:UserModel;
  userForm :UserModel = new UserModel();
  constructor(private formBuilder: FormBuilder, private http: HttpClient,
     private router: Router, private api: ApiService) { }
  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      email: [],
      password: []
    })
  }
  signUp() {
    this.userForm.email = this.signUpForm.value.email
    this.userForm.password = this.signUpForm.value.password
    this.api.signIn(this.userForm).subscribe(res => {
        this.user = res
        if (this.user.email == this.signUpForm.value.email) {
          alert("Login worked!")
          window.localStorage.clear()
          window.localStorage.setItem("email", res.email)
          window.localStorage.setItem("fullName", res.fullName)
          window.localStorage.setItem("role", res.role)
          window.localStorage.setItem("authenticated", "true")
          this.signUpForm.reset();
          this.router.navigate(['']).then(()=>{
            window.location.reload();
          })
    
          return true
        }
        return false

      }, err => {
        alert("ERROR")
        this.signUpForm.reset();
      })
  }

}





