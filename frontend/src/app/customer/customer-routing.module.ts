import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuyerDashboardComponent } from './buyer/buyer-dashboard/buyer-dashboard.component';
import { CheckoutComponent } from './buyer/checkout/checkout.component';
import { SellerDashboardComponent } from './seller/seller-dashboard/seller-dashboard.component';
import { ProductComponent } from '../product/product.component';
import { buyerAuthGuardService, sellerAuthGuardService } from '../shared/services/auth-guard.service';
import { OrderPlaceComponent } from './buyer/order-place/order-place.component';
import { OrderComponent } from './seller/order/order.component';
import { AddtocartComponent } from './buyer/addtocart/addtocart.component';

const routes: Routes = [
  { path: 'buyer-dashboard', canActivate: [buyerAuthGuardService], component: BuyerDashboardComponent },
  { path: "checkout", canActivate: [buyerAuthGuardService], component: CheckoutComponent },
  { path: 'order-place', canActivate: [buyerAuthGuardService], component: OrderPlaceComponent },
  { path: 'cart', canActivate: [buyerAuthGuardService], component: AddtocartComponent },
  { path: "seller-dashboard", canActivate: [sellerAuthGuardService], component: SellerDashboardComponent },
  { path: "seller/product", canActivate: [sellerAuthGuardService], component: ProductComponent },
  { path: "seller/order", canActivate: [sellerAuthGuardService], component: OrderComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
