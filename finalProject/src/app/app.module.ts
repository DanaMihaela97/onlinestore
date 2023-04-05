import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import {HttpClientModule } from '@angular/common/http';
import { ProductComponent } from './components/product/product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AddComponent } from './components/add/add.component';
import { LogoutComponent } from './components/logout/logout.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductInfoComponent } from './components/product-info/product-info.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { BuyComponent } from './components/buy/buy.component';
import { OrderstatusComponent } from './components/orderstatus/orderstatus.component';
import { MyordersComponent } from './components/myorders/myorders.component';
import { OrderInfoComponent } from './components/order-info/order-info.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    ProductComponent,
    AddComponent,
    LogoutComponent,
    CartComponent,
    ProductInfoComponent,
    ProductCardComponent,
    ProductEditComponent,
    BuyComponent,
    OrderstatusComponent,
    MyordersComponent,
    OrderInfoComponent,
    UserEditComponent,
    

 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
   
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
