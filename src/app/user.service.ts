import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private url = "https://notes--app-api.herokuapp.com";
  // private url = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  setUser(user) {
    return this.http.post(this.url + '/signup', user);
  }
}
