import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserCrudComponent } from './user-crud/user-crud.component';
import { AdminProductComponent } from './admin-product/admin-product.component';
import { AdminAllorderComponent } from './admin-allorder/admin-allorder.component';


const routes: Routes = [
  { path: "dashboard", component: AdminDashboardComponent },
  { path: "user", component: UserCrudComponent },
  { path: "product", component: AdminProductComponent },
  { path: "all-order", component: AdminAllorderComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
