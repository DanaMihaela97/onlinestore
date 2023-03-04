import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ProductModel } from './product-dash-board.model';
import { CartService } from 'src/app/services/cart.service';
import { UserModel } from '../register/user.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  formValue!: FormGroup;
  productModelObj: ProductModel = new ProductModel();
  products !: ProductModel[];
  categories !: any;
  productTypes !: any;
  authors !: any;
  queryParams !: any;
  params !: any;
  searchTerm: String = ""
  productType: String = ""
  location!: String;
  user!: UserModel
  authenticated: string = ""

  constructor(private api: ApiService, private formBuilder: FormBuilder, private router: Router,
    private route: ActivatedRoute, private cartService: CartService) {

    route.params.subscribe(params => {
      if (params.searchTerm) {// if search has any value
        this.searchTerm = params.searchTerm
      }
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
  ngOnInit(): void {
   
    if (window.localStorage.getItem("authenticated") == null)
      window.localStorage.setItem("authenticated", "false")

    this.user = new UserModel();
    this.user.email = String(window.localStorage.getItem("email"))
    this.user.firstName = String(window.localStorage.getItem("fullName")?.split(" ")[0])
    this.user.lastName = String(window.localStorage.getItem("fullName")?.split(" ")[1])
    this.user.role = String(window.localStorage.getItem("role"))
    this.authenticated = String(window.localStorage.getItem("authenticated"))
    
 // reactualizare dupa navigare
    this.route.queryParams.subscribe(p => {
      this.queryParams = p
      console.log(this.queryParams)
      this.getAllProducts()
    });
    this.route.params.subscribe(p => {
      this.params = p
      console.log(this.params)
      this.getAllProducts()
    });

    
    this.formValue = this.formBuilder.group({
      title: [''],
      description: [''],
      thumbnail: [''],
      category_name: [''],
      price: [''],
      productType: [''],
      author_id: [''],
    })
  }

  getAllProducts() {
    this.api.getProducts().subscribe(res => {
      this.products = res;
      if (this.queryParams.category != null) {
        this.products = this.products.filter(
          product => product.category_name.toUpperCase() == String(this.queryParams.category).toUpperCase())
      }
      if (this.queryParams.productType != null) {
        this.products = this.products.filter(
          product => product.productType.toUpperCase() == String(this.queryParams.productType).toUpperCase())
      }
      if (this.queryParams.author != null) {
        this.products = this.products.filter(
          product => product.author_id.toUpperCase() == String(this.queryParams.author).toUpperCase()
        )
      }
      if(this.params.searchTerm != null)
      {
        this.products = this.products.filter(
        product => product.title.toLowerCase().includes(this.params.searchTerm.toLowerCase())
        )
      }
    })
  }
  deleteProduct(id: String) {
    this.api.deleteProduct(id).subscribe(res => {
      alert("Product has been deleted!");
      this.getAllProducts();
    })
  }
  addInCart(product: any) {
    this.cartService.addToCart(product)
    alert("Added in cart")
  }

  editProductDetail(row: any) {
    this.productModelObj.id = row.id;
    this.formValue.controls['title'].setValue(row.title);
    this.formValue.controls['description'].setValue(row.description);
    this.formValue.controls['thumbnail'].setValue(row.thumbnail);
    this.formValue.controls['category_name'].setValue(row.category_name);
    this.formValue.controls['price'].setValue(row.price);
    this.formValue.controls['productType'].setValue(row.productType);
    this.formValue.controls['author_id'].setValue(row.author_id);

  }
  //after editing -> update button
  updateProductDetail() {
    this.productModelObj.title = this.formValue.value.title;
    this.productModelObj.description = this.formValue.value.description;
    this.productModelObj.thumbnail = this.formValue.value.thumbnail;
    this.productModelObj.category_name = this.formValue.value.category_name;
    this.productModelObj.price = this.formValue.value.titpricele;
    this.productModelObj.productType = this.formValue.value.productType;
    this.productModelObj.author_id = this.formValue.value.author_id;
    this.api.updateProduct(this.productModelObj, this.productModelObj.id).
      subscribe(res => {
        alert("UDPATED!");
        let ref = document.getElementById('close')
        ref?.click();
        this.formValue.reset();
        this.getAllProducts();
      })
  }
  search(): void {
    if (this.searchTerm)
      this.router.navigateByUrl('/product/search/' + this.searchTerm)
  }


}
