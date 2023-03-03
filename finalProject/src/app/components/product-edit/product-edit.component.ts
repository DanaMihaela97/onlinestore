import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ProductModel } from '../product/product-dash-board.model';
import { ProductForm } from '../product/product-form';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  @Input() product: ProductModel = new ProductModel();
  formEdit!: FormGroup<ProductForm>;
  productModelObj: ProductModel = new ProductModel();
  products !: ProductModel[];
  categories !: any;
  productTypes !: any;
  authors !: any;
  user_role : string='';
  constructor(private api: ApiService, private formBuilder: FormBuilder) {
  }
  ngOnInit(): void {
    this.user_role = String(window.localStorage.getItem('role'));
    this.formEdit = new FormGroup<ProductForm>({
      title: new FormControl('', { nonNullable: true }),
      description: new FormControl('', { nonNullable: true }),
      thumbnail: new FormControl('', { nonNullable: true }),
      category_name: new FormControl('', { nonNullable: true }),
      price: new FormControl(0, { nonNullable: true }),
      productType: new FormControl('', { nonNullable: true }),
      author_id: new FormControl('', { nonNullable: true })
    })
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
  getAllProducts() {
    this.api.getProducts().subscribe(res => {
      this.products = res;

    })
  }
  editDetails() {
    this.productModelObj.id = this.product.id;
    this.formEdit.controls['title'].setValue(this.product.title);
    this.formEdit.controls['description'].setValue(this.product.description);
    this.formEdit.controls['thumbnail'].setValue(this.product.thumbnail);
    this.formEdit.controls['category_name'].setValue(this.product.category_name.charAt(0) + this.product.category_name.slice(1).toLowerCase());
    this.formEdit.controls['author_id'].setValue(this.product.author_id.charAt(0) + this.product.author_id.slice(1).toLowerCase());
    this.formEdit.controls['productType'].setValue(this.product.productType.toUpperCase());
    this.formEdit.controls['price'].setValue(this.product.price);
  }
  updateProductDetail() {
    console.log(this.product)
    this.productModelObj.title = this.formEdit.value.title!;
    this.productModelObj.description = this.formEdit.value.description!;
    this.productModelObj.thumbnail = this.formEdit.value.thumbnail!;
    this.productModelObj.category_name = this.formEdit.value.category_name!.toUpperCase();
    this.productModelObj.productType = this.formEdit.value.productType!.toUpperCase();
    this.productModelObj.author_id = this.formEdit.value.author_id!.toUpperCase();
    this.productModelObj.price = this.formEdit.value.price!;
    this.api.updateProduct(this.productModelObj, this.product.id).
      subscribe(res => {
        alert("UDPATED!");
        let ref = document.getElementById('close')
        ref?.click();
        this.formEdit.reset();
        window.location.reload();
      })
  }
  deleteProduct(id: String) {
    this.api.deleteProduct(id).subscribe(res => {
      alert("Product has been deleted!");
      this.getAllProducts();
    })
  }
  clickSave() {
    this.formEdit.reset();
    let ref = document.getElementById('cancel')
    ref?.click();

  }
}
