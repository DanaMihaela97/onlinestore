import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';
import { UserModel } from '../register/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user!:UserModel
  authenticated:string=""

  constructor(){
  }
  ngOnInit(): void {

  if(window.localStorage.getItem("authenticated") == null)
    window.localStorage.setItem("authenticated", "false")

  this.user = new UserModel();
  this.user.email = String(window.localStorage.getItem("email"))
  this.user.firstName = String(window.localStorage.getItem("fullName")?.split(" ")[0])
  this.user.lastName = String(window.localStorage.getItem("fullName")?.split(" ")[1])
  this.user.role = String(window.localStorage.getItem("role"))
  this.authenticated = String(window.localStorage.getItem("authenticated"))
}
}


