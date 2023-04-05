import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { OrderModel } from '../buy/order.model';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.scss']
})
export class MyordersComponent implements OnInit{

  orders !:OrderModel[];
  user_email:any;
 
  
  constructor(private router: Router, private apiService: ApiService){}
  ngOnInit(): void {
    this.user_email = window.localStorage.getItem("email")
    
    this.apiService.getAllOrdersByUserEmail(this.user_email)
    .subscribe((res)=>{
      this.orders=res;
      console.log(res);
    });
   
  
  }
  loadOrderPage(order_id: string) {
    this.router.navigate(['order-info', order_id])
  }
}
