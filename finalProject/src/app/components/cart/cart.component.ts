import { Component, OnInit, SchemaMetadata } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductModel } from '../product/product-dash-board.model';
import { UserModel } from '../register/user.model';
import { OrderModel } from '../buy/order.model';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],

})
export class CartComponent implements OnInit {
  cartVariables = {
    "products": "",
    "totalPrice": 0
  };
  products !: ProductModel[];
  public total : number=0;

  formValue !: FormGroup;
  orderModelObject:OrderModel = new OrderModel();
  user !:UserModel;

  constructor(private api: ApiService, private formBuilder: FormBuilder, private cartService: CartService) {

  }
  
  ngOnInit() {
    this.total=0;
    this.products = this.cartService.getAllProducts()
    this.products.forEach(product => {
      this.total += product.price
    });
    this.user = new UserModel();
    this.user.email = String(window.localStorage.getItem("email"))
    this.user.firstName = String(window.localStorage.getItem("fullName")?.split(" ")[0])
    this.user.lastName = String(window.localStorage.getItem("fullName")?.split(" ")[1])
    this.user.role = String(window.localStorage.getItem("role"))
    this.cartVariables['products'] = JSON.stringify(this.products);
    this.cartVariables['totalPrice'] = this.total;
    this.formValue=this.formBuilder.group({
      phoneNumber:[''],
      deliveryAddress:['']
      
    })
  }
  removeProd(product: any) {
    this.cartService.removeProduct(product);
    this.ngOnInit(); // refresh
  }
}

