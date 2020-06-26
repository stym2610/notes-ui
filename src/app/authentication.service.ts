import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  constructor(private http: HttpClient) {}

  // private url = "https://notes--app-api.herokuapp.com";
  private url = "http://localhost:3000";

  login(credentials){
    return this.http.post(this.url + '/authenticate', credentials)
      .pipe(
        map((response: any) => {
          let result = response;
          if(result && result.token) {
            localStorage.setItem('token', result.token);
            return true;
          }
          return false;
      }));
  }

  get Token(){
    return localStorage.getItem('token');
  }


  logout() {
    localStorage.removeItem('token');
  }

  // isLoggedIn() {
  //   return tokenNotExpired();
  // }

  get currentUser() {
    let token = localStorage.getItem('token');
    return new JwtHelper().decodeToken(token);
  }
}
