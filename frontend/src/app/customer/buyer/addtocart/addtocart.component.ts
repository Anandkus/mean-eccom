import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-addtocart',
  templateUrl: './addtocart.component.html',
  styleUrls: ['./addtocart.component.scss']
})
export class AddtocartComponent {
  cartData: any = [];
  constructor(private router: Router, private customerApi: CustomerService) { };

  ngOnInit() {
    this.CartDetails()
  }

  CartDetails() {
    this.customerApi.getCart().subscribe(data => {
      if (data && data.product) {
        this.cartData = data.product;
        const totalcart = this.cartData.length;
        localStorage.setItem("cartNumber", totalcart)
      }
    }, error => alert(error.error.message));
  }

  buyNow(productId: any) {
    this.router.navigate(['/checkout'], { queryParams: { id: productId } })
  }
  remove(productId: any) {
    if (productId) {
      this.customerApi.deleteCart(productId).subscribe(data => {
        if (data) {
          alert(data.message);
          this.CartDetails();
        }
      }, error => { alert(error.error.message) })
    }
  }
}
