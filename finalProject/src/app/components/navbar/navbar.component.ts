import { Component, OnInit } from '@angular/core';
import { UserModel } from '../register/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
location!: String;
user!:UserModel
authenticated:string=""

ngOnInit(){
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
