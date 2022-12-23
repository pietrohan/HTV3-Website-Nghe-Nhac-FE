import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from "../../model/user";
import {environment} from "../../../enronments/environment";

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(data: any): Observable<any> {
    return this.http.post<any>(API_URL + '/login', data);
  }

  register(user: User): Observable<any>{
    return this.http.post<any>(API_URL + '/api/auth/sign-up', user);
  }
}
