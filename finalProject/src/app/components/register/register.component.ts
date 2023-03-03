import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { UserModel } from './user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  formValue !:FormGroup;
  registerModel:UserModel = new UserModel();
  register!:UserModel;
 
  constructor(private FormBuilder:FormBuilder, private apiService:ApiService, private http:HttpClient){}

  ngOnInit(): void {
    this.formValue = this.FormBuilder.group({
      firstName: [''],
      lastName: [''],
      password: [''],
      email: ['']
    })
  }
    createUserDetails(){
      this.registerModel.firstName = this.formValue.value.firstName;
      this.registerModel.lastName = this.formValue.value.lastName;
      this.registerModel.password = this.formValue.value.password;
      this.registerModel.email = this.formValue.value.email;
   
      this.apiService.createUser(this.registerModel).subscribe(res=>{
        alert("You just created an account!");
        this.formValue.reset();
        window.location.href = "/login"
      },
      err=>{alert("ERROR!")
      this.formValue.reset();}
      )}
      
     clickAdd() {
  this.formValue.reset();
      }
    }
    
    
  


    
