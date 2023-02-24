import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService implements OnInit {

  public cartProductList:any=[]
  public productList = new BehaviorSubject<any>([])

  constructor(){}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  //getters and setters
}

