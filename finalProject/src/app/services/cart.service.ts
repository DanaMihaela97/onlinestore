import { Injectable, NgModule } from '@angular/core';
import { ProductModel } from '../components/product/product-dash-board.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartProductList: ProductModel[] = []

  constructor() { }
  private i=0;
  public increment(){
    this.i++;
    console.log(this.i);
    console.log(this.cartProductList);
  }
  setProducts(product: any) {
    this.cartProductList.push(...product)
  }
  getTotalPrice(): number {
    let total = 0;
    this.cartProductList.map((p: any) => {
      total += p.total
    })
    return total;
  }

  getAllProducts(){
    return this.cartProductList;
  }
  addToCart(product: ProductModel) {
    this.cartProductList.push(product);
  }
  //remove cart item 
  removeProduct(product: any) {
    this.cartProductList.map((p: any, index: any) => {
      if (product.id === p.id) {
        this.cartProductList.splice(index, 1)
      }
    })
  }
}
