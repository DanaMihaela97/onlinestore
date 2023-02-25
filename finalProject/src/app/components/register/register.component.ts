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

  formValue!: FormGroup;
  // userModelObj: UserModel = new UserModel();
  // showUpdateButton!: boolean;
  // users !: UserModel[];
  // showAddButton!: boolean;
  registerForm !:FormGroup;
  registerModel:UserModel = new UserModel();
 
  constructor(private FormBuilder:FormBuilder, private apiService:ApiService, private http:HttpClient){}

  ngOnInit(): void {
    this.registerForm = this.FormBuilder.group({
      firstName: [''],
      lastName: [''],
      password: [''],
      email: ['']
  
  
    })
  }
  // register(){
  //   this.http.post<any>("http://localhost:8080/api/v1/onlinestore/register", this.registerForm.value).subscribe(res=>{
  //     alert("Registration Successfully!")
  //     this.registerForm.reset();
    
  //   }, err=>{
  //     alert("ERROR!")
  //   })
  // }
 
    createUserDetails(){
      this.registerModel.firstName = this.formValue.value.firstName;
      this.registerModel.lastName = this.formValue.value.lastName;
      this.registerModel.password = this.formValue.value.password;
      this.registerModel.email = this.formValue.value.email;
   

      this.apiService.createUser(this.registerModel).subscribe(res=>{
        alert("You just created an account!");
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
      },
      err=>{alert("ERROR!")
      this.formValue.reset();}
      )}
      
  //     clickAdd() {
  //       this.formValue.reset();
  //       this.showAddButton = true;
  //       this.showUpdateButton = false;
      }
    
    
  


    
