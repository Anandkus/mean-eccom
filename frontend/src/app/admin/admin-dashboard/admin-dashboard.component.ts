import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminSeviceService } from '../services/admin-sevice.service';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {
  user_dashboard_data: any;
  total_user: number = 0;
  admin_user: number = 0;
  seller_user: number = 0;
  buyer_user: number = 0;

  product_dashboard_data: any;
  total_product: number = 0;
  publish_product: number = 0;
  inactive_product: number = 0;
  draft_product: number = 0;

  constructor(private router: Router, private userapiService: AdminSeviceService, private productApiService: ProductService) { }
  ngOnInit() {
    this.adminUserDashboardData();
    this.adminProudctDashboard();
  }
  adminUserDashboardData() {
    this.userapiService.allUser().subscribe(data => {
      if (data) {
        this.user_dashboard_data = data.user;
        for (let i in this.user_dashboard_data) {
          if (this.user_dashboard_data[i].role === 'admin') {
            ++this.admin_user;
          }
          if (this.user_dashboard_data[i].role === 'seller') {
            ++this.seller_user;
          }
          if (this.user_dashboard_data[i].role === 'buyer') {
            ++this.buyer_user;
          }
          ++this.total_user;
        }
      }
    }, error => { alert(error.error.message) })
  }

  adminProudctDashboard() {
    this.productApiService.getAllProudctByAdmin().subscribe(data => {
      if (data.product && data.product.length > 0) {
        this.product_dashboard_data = data.product;
        for (let i in this.product_dashboard_data) {
          if (this.product_dashboard_data[i].status === 'publish') {
            ++this.publish_product;
          }
          if (this.product_dashboard_data[i].status === 'draft') {
            ++this.draft_product;
          }
          if (this.product_dashboard_data[i].status === 'inactive') {
            ++this.inactive_product;
          }
          ++this.total_product;
        }
      }
    }, error => { alert(error.error.message) })
  }
  navigateTo() {
    this.router.navigateByUrl("admin/user")
  }
  navigateToproduct() {
    this.router.navigateByUrl("/admin/product")
  }
}
