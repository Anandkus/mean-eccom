import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserCrudComponent } from './user-crud/user-crud.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminProductComponent } from './admin-product/admin-product.component';
import { AdminAllorderComponent } from './admin-allorder/admin-allorder.component';


@NgModule({
  declarations: [
    AdminLoginComponent,
    AdminDashboardComponent,
    UserCrudComponent,
    AdminProductComponent,
    AdminAllorderComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
