import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-seller-dashboard',
  templateUrl: './seller-dashboard.component.html',
  styleUrls: ['./seller-dashboard.component.scss']
})
export class SellerDashboardComponent {
  product_dashboard_data: any;
  total_product: number = 0;
  publish_product: number = 0;
  inactive_product: number = 0;
  draft_product: number = 0;
  constructor(private router: Router, private prodctApi: ProductService) { };

  ngOnInit() {
    this.productDashboardData();
  }

  productDashboardData() {
    this.prodctApi.getAllProduct().subscribe(data => {
      if (data.product) {
        this.product_dashboard_data = data.product;
        for (let i in this.product_dashboard_data) {
          if (this.product_dashboard_data[i].status === 'publish') {
            ++this.publish_product;
          }
          if (this.product_dashboard_data[i].status === 'inactive') {
            ++this.inactive_product;
          }
          if (this.product_dashboard_data[i].status === 'draft') {
            ++this.draft_product;
          }
          ++this.total_product;
        }
      }
    }, error => { alert(error.error.message) })
  }

  navigatToProduct() {
    this.router.navigateByUrl("/seller/product")
  }
  navigateToOrder() {
    this.router.navigateByUrl("/seller/order")
  }
}
