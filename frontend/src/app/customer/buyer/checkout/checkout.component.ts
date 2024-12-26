import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  productId: any;
  productData: any = [];
  addressData: any = [];
  date: Date = new Date();
  constructor(private route: ActivatedRoute, private customerApi: CustomerService, public router: Router) { };

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.productId = params['id'];
      if (this.productId) {
        this.getProductDetails(this.productId);
      }
    })
    this.getAddressDetails();
  }

  getProductDetails(productId: any) {
    this.customerApi.getSingleProduct(productId).subscribe(data => {
      if (data && data.Product) {
        this.productData = data.Product;
      }

    }, error => { alert(error.error.message) })
  }

  getAddressDetails() {
    this.customerApi.getAddress().subscribe(data => {
      if (data && data.userAndaddress) {
        this.addressData = data.userAndaddress;
        // console.log(this.addressData)
      }
    }, error => { alert(error.error.message) })
  }

  order() {
    const orderData = {
      fullname: this.addressData ? this.addressData.fname + " " + this.addressData.lname : '',
      email: this.addressData ? this.addressData.email : '',
      contact: this.addressData ? this.addressData.mobile : '',
      addressId: this.addressData ? this.addressData.address[0]._id : '',
      sellerId: this.productData ? this.productData.userId : '',
      productId: this.productData ? this.productData._id : '',
      status: "order",
      deliveryDate: this.date.setDate(this.date.getDate() + 7)
    }
    this.customerApi.orderPlace(orderData).subscribe(data => {
      if (data) {
        alert(data.message);
        this.router.navigateByUrl("/order-place")
      }
    }, error => { alert(error.error.message) })
  }
}
