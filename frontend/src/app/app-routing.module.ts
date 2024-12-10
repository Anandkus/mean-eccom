import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { PageNotFoundComponent } from './shared/layout/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "profile", component: UserProfileComponent },

  { path: "admin", loadChildren: () => import("./admin/admin.module").then(m => m.AdminModule) },

  { path: "", loadChildren: () => import("./customer/customer.module").then(m => m.CustomerModule) },

  { path: "", loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule) },
  
  {path:"**",component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
