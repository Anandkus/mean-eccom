import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-order-place',
  templateUrl: './order-place.component.html',
  styleUrls: ['./order-place.component.scss']
})
export class OrderPlaceComponent {
  all_order_data: any = [];
  bg: string = '';
  progresswar = 25;
  constructor(private router: Router, private customerApi: CustomerService) { }
  ngOnInit() {
    this.getOrder();
  }
  getOrder() {
    this.customerApi.getOrderPlace().subscribe(data => {
      if (data) {
        this.all_order_data = data.myOrder;

      }
    }, error => { alert(error.error.message) })
  }
  backGround(value: any) {
    if (value === 'pending') {
      this.bg = "bg-secondary";
    }
    else if (value === 'order') {
      this.bg = 'bg-primary';
    }
    else if (value === 'delivered') {
      this.bg = "bg-success"
    }
    else if (value === 'on-the-way') {
      this.bg = "bg-danger"
    }
    return this.bg;

  }
  getProgressWidth(status: string): number {
    switch (status) {
      case 'order':
        return 25; // 25% width for 'order' status
      case 'pending':
        return 50; // 50% width for 'pending'
      case 'on-the-way':
        return 75; // 75% width for 'on-the-way'
      case 'delivered':
        return 100; // 100% width for 'delivered'
      default:
        return 0;
    }
  }
  deleteOrder(id: any) {
    let conf = confirm("do you want to delete order  !");
    if (conf) {
      this.customerApi.deleteOrder(id).subscribe(data => {
        if (data) {
          alert(data.message);
          this.getOrder();
        }
      }, error => { alert(error.error.message) })
    }
    else {
      alert("You Pressed cancel !")
    }

  }
}
