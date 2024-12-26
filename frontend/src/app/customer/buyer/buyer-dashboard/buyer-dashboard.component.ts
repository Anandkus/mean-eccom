import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buyer-dashboard',
  templateUrl: './buyer-dashboard.component.html',
  styleUrls: ['./buyer-dashboard.component.scss']
})
export class BuyerDashboardComponent {
  all_products: any = [];
  constructor(private router: Router, private customerApi: CustomerService) { };

  ngOnInit() {
    this.getAllProduct()
  }

  getAllProduct() {
    this.customerApi.getAllProduct().subscribe(data => {
      if (data) {
        this.all_products = data.allProduct;
      }
    }, error => { alert(error.error.message) })
  }

  addToCart(productId: any) {
    if (productId) {
      const data = {
        productId: productId
      }
      this.customerApi.addTocart(data).subscribe(data => {
        if (data) {
          alert(data.message);
          this.router.navigateByUrl("/cart")
        }
      }, error => { alert(error.error.message) })
    }
  }
  BuyNow(productId: any) {
    this.router.navigate(['/checkout'], { queryParams: { id: productId } });
  }
}
