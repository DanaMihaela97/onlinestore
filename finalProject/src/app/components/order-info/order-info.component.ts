import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { OrderModel } from '../buy/order.model';
import { ProductModel } from '../product/product-dash-board.model';

@Component({
  selector: 'app-order-info',
  templateUrl: './order-info.component.html',
  styleUrls: ['./order-info.component.scss']
})
export class OrderInfoComponent implements OnInit {
  products: ProductModel[] = [];
  order!: OrderModel;
  index: number = 0;
  order_id: any;
  constructor(private apiService: ApiService, private activatedRoute: ActivatedRoute) {}
  ngOnInit(): void {
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
  }

}
