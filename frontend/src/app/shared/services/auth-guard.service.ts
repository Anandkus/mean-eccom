import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardLogin implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let role = localStorage.getItem("role");
    if (role === 'admin') {
      this.router.navigate(['/admin/dashboard']);
      return false;
    }
    else {
      return true
    }
  }
}
@Injectable({
  providedIn: 'root'
})
//admin after login check 
export class AdminAuthGuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let role = localStorage.getItem("role");
    if (role === 'admin') {
      return true
    }
    else {
      this.router.navigate(['/admin-login']);
      return false;
    }
  }
}

//customer (buyer and seller) before login check 
@Injectable({
  providedIn: 'root'
})
export class sellerBuyerAuthGuardLogin implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let role = localStorage.getItem("role");
    if (role === 'seller') {
      this.router.navigate(['/seller-dashboard']);
      return false;
    }
    else if (role === 'buyer') {
      this.router.navigate(['/buyer-dashboard']);
      return false;
    }
    else {
      return true;
    }
  }
}

//buyer after login check
@Injectable({
  providedIn: 'root'
})
export class buyerAuthGuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let role = localStorage.getItem("role");
    if (role === 'buyer') {
      return true;
    }
    else {
      this.router.navigate(['/sign-in']);
      return false;
    }
  }
}

//seller after login check
@Injectable({
  providedIn: 'root'
})
export class sellerAuthGuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let role = localStorage.getItem("role");
    if (role === 'seller') {
      return true;
    }
    else {
      this.router.navigate(['/sign-in']);
      return false;
    }
  }
}