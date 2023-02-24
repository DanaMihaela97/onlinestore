import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
  public createProduct(data:any){
    console.log(data)
    return this.http.post<any>("http://localhost:8080/api/v1/onlinestore/products", data);
   
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


//USER
public createUser(data:any){
  return this.http.post<any>("http://localhost:8080/api/v1/onlinestore/users/{id}", data)
}
}
