import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { PageNotFoundComponent } from './shared/layout/page-not-found/page-not-found.component';
import { AdminAuthGuardLogin, AdminAuthGuardService, sellerBuyerAuthGuardLogin } from './shared/services/auth-guard.service';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "profile", component: UserProfileComponent },
  { path: "admin-login",canActivate:[AdminAuthGuardLogin], component: AdminLoginComponent },
  { path: "admin", canActivate: [AdminAuthGuardService], loadChildren: () => import("./admin/admin.module").then(m => m.AdminModule) },

  { path: "", loadChildren: () => import("./customer/customer.module").then(m => m.CustomerModule) },

  { path: "", canActivate: [sellerBuyerAuthGuardLogin], loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule) },

  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
