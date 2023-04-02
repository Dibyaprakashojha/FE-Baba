import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private BASE_URL = `${environment.BASE_URL}/users/token`;

  constructor(private http: HttpClient) {}

  //calling the backend to generate token
  generateToken = (username: string, password: string): Observable<any> => {
    return this.http.post(this.BASE_URL, { username, password });
  };

  //for login user
  loginUser = (token: string) => {
    localStorage.setItem('token', token);
    return true;
  };

  //is Logged In
  isLoggedIn = () => {
    let token = localStorage.getItem('token');
    if (token == undefined || token === '' || token == null) {
      return false;
    } else {
      return true;
    }
  };

  //for logout
  logout = () => {
    localStorage.removeItem('token');
    return true;
  };

  //getting token
  getToken = () => {
    return localStorage.getItem('token');
  };
}
