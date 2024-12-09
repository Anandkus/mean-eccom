import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { SellerDashboardComponent } from './seller/seller-dashboard/seller-dashboard.component';
import { BuyerDashboardComponent } from './buyer/buyer-dashboard/buyer-dashboard.component';
import { CheckoutComponent } from './buyer/checkout/checkout.component';


@NgModule({
  declarations: [
    SellerDashboardComponent,
    BuyerDashboardComponent,
    CheckoutComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule
  ]
})
export class CustomerModule { }
