import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
location!: String;
ngOnInit(){
  this.location = window.location.pathname
  if(this.location != "/product")
    this.location="/product"
  console.log(this.location)
}
}
