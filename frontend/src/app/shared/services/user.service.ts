import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getUserProfile(): Observable<any> {
    return this.http.get(this.url + "/user/profile")
  }
  updateUserProfile(id: any, data: FormData): Observable<any> {
    return this.http.put(this.url + `/user/profile/${id}`, data)
  }
}
