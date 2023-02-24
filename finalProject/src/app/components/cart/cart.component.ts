import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{

  public product:any=[]
  public totalPrice!:number;
  constructor(private cartService:CartService){}
  
  ngOnInit(): void {
   

    throw new Error('Method not implemented.');
  }
  

}
