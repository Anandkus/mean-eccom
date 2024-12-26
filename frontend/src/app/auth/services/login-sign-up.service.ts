import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginSignUpService {

  private url = environment.apiUrl;
  constructor(public http: HttpClient) { }

  userRegister(data: any): Observable<any> {
    return this.http.post(this.url + "/user/sign-up/", data);
  }

  userLogin(data: any): Observable<any> {
    return this.http.post(this.url + "/user/sign-in/", data);
  }

  getAlluser(): Observable<any> {
    return this.http.get(this.url + "/user/getall/");
  }
}
