import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductModel } from '../product/product-dash-board.model';
import { UserModel } from '../register/user.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {


  @Input() product!: ProductModel;
  location!: String;
  user: UserModel = new UserModel();
  authenticated: string = ""
  constructor(private router: Router,
    private apiService: ApiService,
    private cartService: CartService) {
  }
  ngOnInit(): void {
    if (window.localStorage.getItem("authenticated") == null)
      window.localStorage.setItem("authenticated", "false")
    if (window.localStorage.getItem("authenticated") == "true") {
      this.user.email = String(window.localStorage.getItem("email"))
      this.user.firstName = String(window.localStorage.getItem("fullName")?.split(" ")[0])
      this.user.lastName = String(window.localStorage.getItem("fullName")?.split(" ")[1])
      this.user.role = String(window.localStorage.getItem("role"))
      this.authenticated = String(window.localStorage.getItem("authenticated"))
    }
  }
  loadProductPage(product_id: string) {
    this.router.navigate(['products', product_id])
    console.log("Am apasat pe ", product_id)
  }
  addInCart(product: any) {
    this.cartService.addToCart(product)
    alert("Added in cart")
  }
  deleteProduct(id: String) {
    this.apiService.deleteProduct(id).subscribe(res => {
      alert("Product has been deleted!");
      window.location.reload()
    })
  }

}
