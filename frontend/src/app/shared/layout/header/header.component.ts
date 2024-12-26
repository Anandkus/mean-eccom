import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/customer/services/customer.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  logged_in: boolean = false;
  user_role!: string | null;
  path: any = "/";
  cartNumber = 0;
  constructor(private router: Router, private customerApi: CustomerService) { }

  ngOnInit() {

  }
  ngDoCheck() {
    this.cartNumber = Number(localStorage.getItem("cartNumber"));

    this.user_role = localStorage.getItem("role");
    const jwtToken = localStorage.getItem("jwt");
    if (jwtToken) {
      this.logged_in = true;
    }

    if (this.user_role === 'admin') {
      this.path = '/admin/dashboard'
    }
    else if (this.user_role === 'buyer') {
      this.path = '/buyer-dashboard'
    }
    else if (this.user_role === 'seller') {
      this.path = '/seller-dashboard'
    }
    else {
      this.path = '/'
    }
  }
  logOut() {
    localStorage.removeItem("jwt"),
      localStorage.removeItem("role"),
      this.router.navigateByUrl("/sign-in")
    this.logged_in = false;
  }

}
