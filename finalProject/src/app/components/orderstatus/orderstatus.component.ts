import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { concatMap, interval, observable, of, timer } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { OrderModel } from '../buy/order.model';
import { ProductModel } from '../product/product-dash-board.model';

@Component({
  selector: 'app-orderstatus',
  templateUrl: './orderstatus.component.html',
  styleUrls: ['./orderstatus.component.scss']
})
export class OrderstatusComponent implements OnInit {
  status: string[];
  order!: OrderModel;
  index: number = 0;
  order_id: any;
  products: ProductModel[] = [];
 
  constructor(private apiService: ApiService, private activatedRoute: ActivatedRoute) {
    this.index = 0;
    this.status = ["PENDING", "CONFIRMED", "DELIVERING", "DELIVERED"]
  }
  ngOnInit(): void {
    const obs$ = timer(1000, 5000);

    this.activatedRoute.params.subscribe(
      params => {
        this.order_id = params.id
        this.apiService.getOrderById(params.id)
          .subscribe(res => {
            this.order = res
            console.log(this.order)
          })
        this.apiService.getOrderLines(params.id).subscribe({
          next: (res) => {
            for (let index of res)
              this.apiService.getProductById(index.product_id).subscribe({
                next: (res) => {
                  this.products.push(res)
                }
              })
          }
        })
      }
    )

    var observable = obs$.subscribe((d) => {
      this.order.order_status = this.status[this.index]
      this.apiService.updateOrder(this.order, this.order_id).subscribe(res => {
        console.log("updated with status " + res.order_status);
      })
      this.index++;
      if (this.index > 3) {
        observable.unsubscribe()
      }
    })
  }
}




