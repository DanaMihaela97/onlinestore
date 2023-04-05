import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { UserModel } from '../register/user.model';
import { UserForm } from './user-form';
import { enc, AES } from 'crypto-js';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})

export class UserEditComponent implements OnInit{
  secretKey ='my-secret-key';
  encryptedPass = AES.encrypt('password', this.secretKey).toString();
  decryptedPass = AES.decrypt(this.encryptedPass, this.secretKey).toString()
  
  userModel:UserModel = new UserModel();
  user={
    "name":"",
    "email":"",
    "password":""
  }
  formEdit !: FormGroup<UserForm>;
  constructor(private apiService:ApiService){}

  ngOnInit(): void {
    this.formEdit = new FormGroup<UserForm>({
      firstName:new FormControl('', {nonNullable:true}),
      lastName : new FormControl('', {nonNullable:true}),
      email : new FormControl('', {nonNullable:true}),
      password : new FormControl('', {nonNullable:true})
    })
  }
  editDetails(){
    this.apiService.getUser(String(window.localStorage.getItem("email"))).subscribe(
      res=>{
      this.userModel.email = res.email;
      this.userModel.firstName = res.name.split(' ')[0];
      this.userModel.lastName = res.name.split(' ')[1];
      this.userModel.id = res.id;
     this.userModel.password =AES.decrypt(this.encryptedPass, this.secretKey).toString(enc.Utf8); 
      this.formEdit.controls['firstName'].setValue(this.userModel.firstName)
      this.formEdit.controls['lastName'].setValue( this.userModel.lastName)
      this.formEdit.controls['email'].setValue(this.userModel.email)
      this.formEdit.controls['password'].setValue(this.userModel.password)
  })}
  updateUserDetails(){
    this.user.name = this.formEdit.value.firstName! + " " + this.formEdit.value.lastName!;
    this.user.email = this.formEdit.value.email!;
    this.user.password =  AES.encrypt('password', this.secretKey).toString();
    this.apiService.updateUser(this.user, this.userModel.id)
    .subscribe(res=>{
      alert("DETAILS UPDATED")
      
    })
  }
  clickSave() {
    let ref = document.getElementById('cancel')
    ref?.click();
  }
}
