import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private url = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getAllProduct(): Observable<any> {
    return this.http.get(this.url + "/buyer")
  }

  getSingleProduct(productId: any): Observable<any> {
    return this.http.get(this.url + "/buyer/" + productId)
  }
  getAddress(): Observable<any> {
    return this.http.get(this.url + "/buyer/add")
  }
  addNewAddress(data: any): Observable<any> {
    return this.http.post(this.url + "/buyer/address/create/", data);
  }
  deleteAddress(id: any): Observable<any> {
    return this.http.delete(this.url + "/buyer/address/delete/" + id)
  }
  orderPlace(orderData: any): Observable<any> {
    return this.http.post(this.url + "/order/place/", orderData)
  }
  getOrderPlace(): Observable<any> {
    return this.http.get(this.url + "/order/my-order")
  }
  getOrders(): Observable<any> {
    return this.http.get(this.url + "/order/get")
  }
  updateOrder(id: any, data: any): Observable<any> {
    return this.http.put(this.url + "/order/" + id, data)
  }
  deleteOrder(id: any): Observable<any> {
    return this.http.delete(this.url + "/order/delete/" + id)
  }
  getOrderByAdmin(): Observable<any> {
    return this.http.get(this.url + "/order/admin")
  }
  addTocart(data: any): Observable<any> {
    return this.http.post(this.url + "/cart/add/", data);
  }
  getCart(): Observable<any> {
    return this.http.get(this.url + "/cart")
  }
  deleteCart(id: any): Observable<any> {
    return this.http.delete(this.url + "/cart/del/" + id)
  }
}
