import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  adddressForm!: FormGroup;
  constructor(private route: ActivatedRoute, private customerApi: CustomerService, public router: Router) {
    this.adddressForm = new FormGroup({
      address1: new FormControl("", [Validators.required]),
      address2: new FormControl("", [Validators.required]),
      city: new FormControl("", [Validators.required]),
      state: new FormControl("", [Validators.required]),
      zipcode: new FormControl("", [Validators.required]),
      mobile: new FormControl("", [Validators.required])
    })

  };

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

  order(id: any) {
    const addressId = id;
    const orderData = {
      fullname: this.addressData ? this.addressData.fname + " " + this.addressData.lname : '',
      email: this.addressData ? this.addressData.email : '',
      contact: this.addressData ? this.addressData.mobile : '',
      addressId: addressId ? addressId : this.addressData.address[0]._id,
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

  save() {
    if (this.adddressForm.invalid) {
      return alert("pls check field !")
    }
    this.customerApi.addNewAddress(this.adddressForm.value).subscribe(data => {
      if (data) {
        alert(data.message);
        this.adddressForm.reset();
        this.getAddressDetails();
      }
    }, error => { alert(error.error.message) })
  }

  deleteadd(id: any) {
    this.customerApi.deleteAddress(id).subscribe(data => {
      if (data) {
        alert(data.message);
        this.getAddressDetails();
      }
    }, error => { alert(error.error.message) });
  }
}
