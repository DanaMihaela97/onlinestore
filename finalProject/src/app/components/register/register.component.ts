import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { UserModel } from './user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  formValue!: FormGroup;
  userModelObj: UserModel = new UserModel();
  showUpdateButton!: boolean;
  users !: UserModel[];
  showAddButton!: boolean;
 
  constructor(private FormBuilder:FormBuilder, private apiService:ApiService){}
  ngOnInit(): void {

    this.showAddButton = true;
    this.formValue = this.FormBuilder.group({
      name: [''],
      email: [''],
      password: [''],
      city: [''],
      phoneNumber: [''],
      avatar: [''],
  
    })
  }

    createUserDetails(){
      this.userModelObj.name = this.formValue.value.name;
      this.userModelObj.email = this.formValue.value.email;
      this.userModelObj.password = this.formValue.value.password;
      this.userModelObj.city = this.formValue.value.city;
      this.userModelObj.phoneNumber = this.formValue.value.password;
      this.userModelObj.avatar = this.formValue.value.avatar;

      this.apiService.createUser(this.userModelObj).subscribe(res=>{
        alert("You just created an account!");
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
      },
      err=>{alert("ERROR!")})}
      
      clickAdd() {
        this.formValue.reset();
        this.showAddButton = true;
        this.showUpdateButton = false;
      }
    }
    
  



