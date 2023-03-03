import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { ProductModel } from '../product/product-dash-board.model';
import { UserModel } from '../register/user.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent implements OnInit {
  product: ProductModel = new ProductModel();
  location!: String;
  user!: UserModel
  authenticated: string = ""
  constructor(private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private cartService: CartService) {
  }
  ngOnInit(): void {
    
    if (window.localStorage.getItem("authenticated") == null)
      window.localStorage.setItem("authenticated", "false")
    this.location = window.location.pathname
    if (this.location != "/product") // => home/clients/contact/cart/addprod
      this.location = "/product"
    this.user = new UserModel();
    this.user.email = String(window.localStorage.getItem("email"))
    this.user.firstName = String(window.localStorage.getItem("fullName")?.split(" ")[0])
    this.user.lastName = String(window.localStorage.getItem("fullName")?.split(" ")[1])
    this.user.role = String(window.localStorage.getItem("role"))
    this.authenticated = String(window.localStorage.getItem("authenticated"))
    this.activatedRoute.params.subscribe(
      params=>{
        this.apiService.getProductById(params.id)
        .subscribe(res => { this.product = res
        })
      }
    )
  }
  addInCart(product: any) {
    
    this.cartService.increment()
    this.cartService.addToCart(product)
    alert("Added in cart")
  }
}
