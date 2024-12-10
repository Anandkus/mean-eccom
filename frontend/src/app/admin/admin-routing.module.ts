import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserCrudComponent } from './user-crud/user-crud.component';


const routes: Routes = [
  { path: "dashboard", component: AdminDashboardComponent },
  { path: "user", component: UserCrudComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
