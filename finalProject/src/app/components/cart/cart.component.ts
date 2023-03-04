import { Component, OnInit, SchemaMetadata } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductModel } from '../product/product-dash-board.model';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],

})
export class CartComponent implements OnInit {

  products !: ProductModel[];
  public total : number=0;

  constructor(private api: ApiService, private formBuilder: FormBuilder, private cartService: CartService) {

  }
  ngOnInit() {
    this.total=0;
    this.products = this.cartService.getAllProducts()
    this.products.forEach(product => {
      this.total += product.price
    });
  }
  removeProd(product: any) {
    this.cartService.removeProduct(product);
    this.ngOnInit(); // refresh
  }

}

