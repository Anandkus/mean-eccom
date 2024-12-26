import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { SellerDashboardComponent } from './seller/seller-dashboard/seller-dashboard.component';
import { BuyerDashboardComponent } from './buyer/buyer-dashboard/buyer-dashboard.component';
import { CheckoutComponent } from './buyer/checkout/checkout.component';
import { OrderPlaceComponent } from './buyer/order-place/order-place.component';
import { OrderComponent } from './seller/order/order.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddtocartComponent } from './buyer/addtocart/addtocart.component';


@NgModule({
  declarations: [
    SellerDashboardComponent,
    BuyerDashboardComponent,
    CheckoutComponent,
    OrderPlaceComponent,
    OrderComponent,
    AddtocartComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    ReactiveFormsModule
  ]
})
export class CustomerModule { }
