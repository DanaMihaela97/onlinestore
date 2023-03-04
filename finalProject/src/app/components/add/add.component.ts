import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ProductModel } from '../product/product-dash-board.model';
import { UserModel } from '../register/user.model';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  formValue!: FormGroup;
  productModelObj: ProductModel = new ProductModel();
  showUpdateButton!: boolean;
  categories !: any;
  productTypes !: any;
  authors !: any;
  user !:UserModel;
  
  constructor( private formBuilder: FormBuilder,
     private api:ApiService) { }

  ngOnInit(): void {
    this.user = new UserModel();
    this.user.email = String(window.localStorage.getItem("email"))
    this.user.firstName = String(window.localStorage.getItem("fullName")?.split(" ")[0])
    this.user.lastName = String(window.localStorage.getItem("fullName")?.split(" ")[1])
    this.user.role = String(window.localStorage.getItem("role"))
    
    this.formValue = this.formBuilder.group({
      title: [''],
      description: [''],
      thumbnail: [''],
      category_name: [''],
      price: [''],
      productType: [''],
      author_id: [''],
    })
    // get all categories from DB
    this.api.getCategories().subscribe(res => {
      this.categories = res
    })
    // get all product types from DB
    this.productTypes = [
      "HEADPHONES",
      "LAPTOP",
      "TELEPHONE",
      "TABLET",
      "MOUSE",
      "KEYBOARD",
      "FRIDGE",
      "WASHING_MACHINE"
    ]
    // get all authors from DB
    this.api.getAuthors().subscribe(res => {
      this.authors = res;
    })
  }
  createProductDetails() {
    this.productModelObj.title = this.formValue.value.title;
    this.productModelObj.description = this.formValue.value.description;
    this.productModelObj.thumbnail = this.formValue.value.thumbnail;
    this.productModelObj.category_name = this.formValue.value.category_name;
    this.productModelObj.price = this.formValue.value.price;
    this.productModelObj.productType = String(this.formValue.value.productType);
    this.productModelObj.author_id = this.formValue.value.author_id;

    this.api.createProduct(this.productModelObj).subscribe(res => {
      
      alert("Product added!")
      this.formValue.reset();
     
    },
      err => { alert("ERROR!") }

    )
  }
  clickAdd() {
    this.formValue.reset();

  }
}
