import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/customer/services/customer.service';

@Component({
  selector: 'app-admin-allorder',
  templateUrl: './admin-allorder.component.html',
  styleUrls: ['./admin-allorder.component.scss']
})
export class AdminAllorderComponent {
 order_data: any = [];
  orderForm!: FormGroup;
  constructor(private router: Router, private customerService: CustomerService) {
    this.orderForm = new FormGroup({
      orders: new FormArray([]) // Define the FormArray for orders
    });
  }
  // Get the FormArray as a getter
  get orders(): FormArray {
    return this.orderForm.get('orders') as FormArray;
  }

  ngOnInit() {
    this.getAllOrder();
  }

  getAllOrder() {
    this.customerService.getOrderByAdmin().subscribe(data => {
      if (data) {
        this.order_data = data.allOrder;
        this.order_data.forEach((order: { deliveryDate: any; status: any; }) => {
          const deliveryDate = new Date(order.deliveryDate).toISOString().split('T')[0];

          const orderGroup = new FormGroup({
            deliveryDate: new FormControl(deliveryDate),
            status: new FormControl(order.status)
          });
          this.orders.push(orderGroup);
        });
      }
    }, error => { alert(error.error.message) })
  }

  update(id: any, i: any) {
    const updateData = {
      status: this.orderForm.value.orders[i].status,
      deliveryDate: this.orderForm.value.orders[i].deliveryDate
    }
    this.customerService.updateOrder(id, updateData).subscribe(data => {
      if (data) {
        alert(data.message);
        this.orders.clear();
        this.getAllOrder();
      }
    }, error => { alert(error.error.message) })
  }
}
