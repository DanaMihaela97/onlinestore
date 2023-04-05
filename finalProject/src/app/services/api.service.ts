import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { OrderModel } from '../components/buy/order.model';
import { ProductModel } from '../components/product/product-dash-board.model';
import { UserModel } from '../components/register/user.model';
import { userRequest } from './userRequest';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // for search bar
  private url:string='http://localhost:8080/api/v1/onlinestore'
  isLogged: boolean = false;
  user!: UserModel;
  constructor(private http:HttpClient) { }

  
  public createProduct(data:any){
    console.log(data)
    return this.http.post<any>("http://localhost:8080/api/v1/onlinestore/products", data);
    
  }
  // search bar
  getProductById(id: any) {
    return this.http.get<any>("http://localhost:8080/api/v1/onlinestore/products/" + id)
  }
  getProd(productTitle:string){
    return this.http.get(`${this.url}/products/search?q=${productTitle}`)
  }
  getProducts(){
    return this.http.get<any>("http://localhost:8080/api/v1/onlinestore/products")
  }
  getCategories(){
    return this.http.get<any>("http://localhost:8080/api/v1/onlinestore/categories")
  }
  getAuthors(){
    return this.http.get<any>("http://localhost:8080/api/v1/onlinestore/authors")

  }
  
  
  deleteProduct(id:any){
    return this.http.delete<any>("http://localhost:8080/api/v1/onlinestore/products/" + id)
  }
  // data=body
  updateProduct(data :any, id: any){
    console.log(data)
    return this.http.put<any>("http://localhost:8080/api/v1/onlinestore/products/" + id, data)
  }


  //USER
  public createUser(user:UserModel){
    return this.http.post<any>("http://localhost:8080/api/v1/onlinestore/register", user)
  }
  public signIn(user:userRequest){
    return this.http.post<any>("http://localhost:8080/api/v1/onlinestore/authenticate", user)
  }
  public setUser(user:UserModel){
    this.user = user
  }
  public getUser(email: String){
    return this.http.get<any>("http://localhost:8080/api/v1/onlinestore/users/"+email);
  }
  public updateUser(user:any, id:any){
    return this.http.put<any>("http://localhost:8080/api/v1/onlinestore/users/" + id, user);
  }

  
  //ORDER
  public createOrder(order:OrderModel){
    return this.http.post<any>("http://localhost:8080/api/v1/onlinestore/users/" +
     order.user_email + "/orders", order)
  }
  updateOrder(order: OrderModel, id: any) {
    return this.http.put<any>("http://localhost:8080/api/v1/onlinestore/users/" +
    window.localStorage.getItem("email") + "/orders/" + id, order);
  }
  getOrderById(id: any) {
    return this.http.get<any>("http://localhost:8080/api/v1/onlinestore/users/" +
    window.localStorage.getItem("email") + "/orders/"+ id);
  }
  getAllOrdersByUserEmail(email:String){
    console.log("http://localhost:8080/api/v1/onlinestore/users/" + email +"/orders")
    return this.http.get<any>("http://localhost:8080/api/v1/onlinestore/users/" + email +"/orders")
    
  }
  createOrderLine(product: ProductModel, order_id:string, email: string) {
    let body={
      "numberOfProducts": 1,
      "productPrice": product.price,
      "product_id": product.id,
      "order_id": order_id
    }
    return this.http.post<any>("http://localhost:8080/api/v1/onlinestore/users/"+ email +
    "/orders/"+order_id+"/order_lines",body)
  }
  getOrderLines(id: any) {
    let email = String(window.localStorage.getItem("email"))
    return this.http.get<any>("http://localhost:8080/api/v1/onlinestore/users/" + email +"/orders/"+id+"/order_lines")
  }
}
