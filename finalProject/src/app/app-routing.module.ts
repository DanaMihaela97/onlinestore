import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProductComponent } from './components/product/product.component';
import { RegisterComponent } from './components/register/register.component';
import { AddComponent } from './components/add/add.component';
import { LogoutComponent } from './components/logout/logout.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductInfoComponent } from './components/product-info/product-info.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { BuyComponent } from './components/buy/buy.component';
import { OrderstatusComponent } from './components/orderstatus/orderstatus.component';
import { MyordersComponent } from './components/myorders/myorders.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { OrderInfoComponent } from './components/order-info/order-info.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'footer',
    component: FooterComponent
  },
  {
    path: 'product',
    component: ProductComponent
  },
  {
    path: 'add',
    component: AddComponent
  },
  {
    path:'cart',
    component:CartComponent
  },
  { 
    path:'products/:id',
    component:ProductInfoComponent
  },
  {
    path:'product/search/:searchTerm',
    component:ProductComponent
  },
  {
    path:'edit',
    component:ProductEditComponent
  },
  {
    path:'buy',
    component:BuyComponent
  },
  {
    path:'orders/:id',
    component:OrderstatusComponent
  },
{
  path:'orders',
  component:MyordersComponent
},
{
  path:'user-edit',
  component:UserEditComponent
},
{
  path:'order-info/:id',
  component:OrderInfoComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
