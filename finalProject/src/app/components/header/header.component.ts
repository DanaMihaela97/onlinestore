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
  public totalProducts:number=0;

  location!: String;
  user!:UserModel
  authenticated:string=""

  //search bar
  searchForm:FormGroup = new FormGroup({
    search:new FormControl('')
  })
    public productList:Array<any>=[];

  constructor(private apiService:ApiService, private formBuilder: FormBuilder, private cartService:CartService){
   
  }
  ngOnInit(): void {

  if(window.localStorage.getItem("authenticated") == null)
    window.localStorage.setItem("authenticated", "false")
    this.location = window.location.pathname

  if(this.location != "/product") // => home/clients/contact/cart/addprod
    this.location="/product"
  console.log(this.location)
  this.user = new UserModel();
  this.user.email = String(window.localStorage.getItem("email"))
  this.user.firstName = String(window.localStorage.getItem("fullName")?.split(" ")[0])
  this.user.lastName = String(window.localStorage.getItem("fullName")?.split(" ")[1])
  this.user.role = String(window.localStorage.getItem("role"))
  this.authenticated = String(window.localStorage.getItem("authenticated"))

    
   
  }
  
}
 


