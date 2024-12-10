import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuyerDashboardComponent } from './buyer/buyer-dashboard/buyer-dashboard.component';
import { CheckoutComponent } from './buyer/checkout/checkout.component';
import { SellerDashboardComponent } from './seller/seller-dashboard/seller-dashboard.component';
import { ProductComponent } from '../product/product.component';

const routes: Routes = [
  { path: 'buyer-dashboard', component: BuyerDashboardComponent },
  { path: "checkout", component: CheckoutComponent },
  { path: "seller-dashboard", component: SellerDashboardComponent },
  { path: "seller/product",component:ProductComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
