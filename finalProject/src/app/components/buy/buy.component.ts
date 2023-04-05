import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ProductModel } from '../product/product-dash-board.model';
import { OrderModel } from './order.model';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.scss']
})
export class BuyComponent implements OnInit {

  formValue !: FormGroup;
  
  orderModel: OrderModel = new OrderModel();
  constructor(private FormBuilder: FormBuilder, private apiService: ApiService,
    private router: Router) { }
  @Input() buyVariables:any;
  totalCost!: number;
  products!: ProductModel[];

  ngOnInit(): void {
    this.formValue = this.FormBuilder.group({
      phoneNumber: [''],
      deliveryAddress: [''],
      city: ['']
    })
    this.totalCost = this.buyVariables['totalPrice'];
    this.products = JSON.parse(this.buyVariables['products']);
  }
  createOrderDetails() {
    this.orderModel.phoneNumber = this.formValue.value.phoneNumber;
    this.orderModel.totalCost = String(this.totalCost);
    this.orderModel.city = this.formValue.value.city;
    this.orderModel.deliveryAddress = this.formValue.value.deliveryAddress;
    this.orderModel.dateOfSubmission = new Date().toISOString();
    this.orderModel.user_email =  String(window.localStorage.getItem("email"));
    this.orderModel.order_status = "PENDING"
    this.apiService.createOrder(this.orderModel)
      .subscribe({
        next: (res) => {
          alert("Buy successfully");
          for(let product in this.products){
            this.apiService.createOrderLine(this.products[product], res.id, String(window.localStorage.getItem("email"))).subscribe({
              next: (res) => {
                console.log(res)},
                error:()=>{
                  console.error();
                }});
          }
          this.formValue.reset();
          // this.router.navigateByUrl('/orders/' + res.id)
          window.location.href = "/orders/" + res.id
        },
        error: () => {
          console.error();
          
          this.formValue.reset();
        }
      })
  }

}

