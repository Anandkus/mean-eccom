import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
 private url = environment.apiUrl;
  constructor(private http: HttpClient) { }

  addNewProduct(productData: any): Observable<any> {
    return this.http.post(this.url + '/product/add/', productData);
  }
  getAllProduct(): Observable<any> {
    return this.http.get(this.url + "/product/all")
  }
  getAllProudctByAdmin(): Observable<any> {
    return this.http.get(this.url + "/product/admin")
  }
  getSingleProduct(productId: any): Observable<any> {
    return this.http.get(this.url + "/product/" + productId)
  }
  updateProduct(productId: any, productData: any): Observable<any> {
    return this.http.put(this.url + "/product/edit/" + productId, productData)
  }
  deleteProduct(productId: any): Observable<any> {
    return this.http.delete(this.url + `/product/del/${productId}`)
  }
  deleteProductByAdmin(productId: any): Observable<any> {
    return this.http.delete(this.url + "/product/admin/del/" + productId)
  }
}
