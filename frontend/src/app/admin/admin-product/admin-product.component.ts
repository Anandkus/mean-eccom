import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent {
  all_product_data: any = [];
  header_title!: string;
  add_update_check: boolean = false;
  producForm!: FormGroup;
  productId: any;
  constructor(private router: Router, private apiService: ProductService) {
    this.producForm = new FormGroup({
      productName: new FormControl("", [Validators.required]),
      desc: new FormControl("", [Validators.required]),
      price: new FormControl("", [Validators.required]),
      discountPrice: new FormControl("", [Validators.required]),
      status: new FormControl("", [Validators.required]),
      productUrl: new FormControl("", [Validators.required])
    })
  }
  ngOnInit() {
    this.getProduct()
  }
  addNewProduct() {
    this.producForm.reset();
    this.header_title = "Add New Product !";
    this.add_update_check = true;
  }
  save() {
    if (this.producForm.invalid) {
      return alert("pls check field ! ")
    }
    this.apiService.addNewProduct(this.producForm.value).subscribe(data => {
      if (data) {
        alert(data.message);
        this.producForm.reset();
        this.getProduct();
      }
    }, error => { alert(error.error.message) })
  }

  getProduct() {
    this.apiService.getAllProudctByAdmin().subscribe(data => {
      if (data) {
        this.all_product_data = data.product;
      }
    }, error => { alert(error.error.message) })
  }
  edit(id: any) {
    this.header_title = "Update Product !";
    this.add_update_check = false;
    this.productId = id;
    this.apiService.getSingleProduct(this.productId).subscribe(data => {
      if (data) {
        const product = data.product;
        this.producForm.patchValue(product)
      }
    }, error => { alert(error.error.message) })
  }

  updateProduct() {
    if (this.producForm.invalid) {
      return alert("pls check field ! ")
    }
    const productData = this.producForm.value;
    this.apiService.updateProduct(this.productId, productData).subscribe(data => {
      if (data) {
        alert(data.message);
        this.producForm.reset();
        this.getProduct();
      }
    }, error => { alert(error.error.message) })
  }

  deleteProduct(id: any) {
    this.apiService.deleteProductByAdmin(id).subscribe(data => {
      if (data) {
        alert(data.message);
        this.getProduct();
      }
    }, error => { alert(error.error.message) })
  }
}
