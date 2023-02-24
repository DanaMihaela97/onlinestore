import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ProductModel } from './product-dash-board.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  formValue!: FormGroup;
  productModelObj: ProductModel = new ProductModel();
  showUpdateButton!: boolean;
  products !: ProductModel[];
  categories !: any;
  productTypes !: any;
  authors !: any;
  showAddButton!: boolean;
  params !: any;




  constructor(private api: ApiService, private formBuilder: FormBuilder, route: ActivatedRoute) {
    route.queryParams.subscribe(p => this.params = p);
  }
  ngOnInit(): void {

    this.showAddButton = true;
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
    // get all products from DB
    this.api.getProducts().subscribe(res => {
      this.products = res;
      if (this.params.category != null) {
        this.products = this.products.filter(
          product => product.category_name.toUpperCase() == String(this.params.category).toUpperCase())
      }
      if (this.params.type != null) {
        this.products = this.products.filter(
          product => product.productType.toUpperCase() == String(this.params.type).toUpperCase())
      }
      if (this.params.author != null) {
        this.products = this.products.filter(
          product => product.author_id.toUpperCase() == String(this.params.author).toUpperCase()
        )
      }
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
  getAllProducts() {
    this.api.getProducts().subscribe(res => {
      this.products = res;
    })
  }
  deleteProduct(id: String) {
    this.api.deleteProduct(id).subscribe(res => {
      alert("Product has been deleted!");
      this.getAllProducts();
    })
  }


}
