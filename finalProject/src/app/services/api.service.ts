import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { ProductModel } from '../components/product/product-dash-board.model';
import { UserModel } from '../components/register/user.model';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  static getCategories() {
    throw new Error('Method not implemented.');
  }
  static getUser //USER
    () {
      throw new Error('Method not implemented.');
  }

  
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
  public signIn(user:UserModel){
    return this.http.post<any>("http://localhost:8080/api/v1/onlinestore/signIn", user)
  }
  public setUser(user:UserModel){
    this.user = user
  }
  public getUser(): UserModel{
    return this.user;
  }
}
