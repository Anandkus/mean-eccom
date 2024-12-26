import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminSeviceService {
  private url = environment.apiUrl;

  constructor(private http: HttpClient) { };

  adminLogin(data: any): Observable<any> {
    return this.http.post(this.url + "/admin/login", data);
  }
  allUser(): Observable<any> {
    return this.http.get(this.url + "/user");
  }
  singleUser(id: any): Observable<any> {
    return this.http.get(this.url + "/admin/" + id);
  }
  updateUser(id: any, data: any): Observable<any> {
    return this.http.put(this.url + "/admin/edit/" + id, data);
  }
  deleteUser(data: any): Observable<any> {
    return this.http.post(this.url + "/admin/delete/", data);
  }
}
