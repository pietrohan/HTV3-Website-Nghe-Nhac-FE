import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../../enronments/environment";
import {User} from "../../model/user";


const AUTH_API = environment.apiUrl;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + '/login', {
      username,
      password
    }, httpOptions);
  }

  register(users: User): Observable<any> {
    return this.http.post(AUTH_API + '/register', users, httpOptions);
  }
}
