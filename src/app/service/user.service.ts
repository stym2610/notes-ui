import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
	
  // private url = environment.API_URL;

    // private url = "https://notes--app-api.herokuapp.com";
    private url = "http://localhost:3001";

    constructor(private http: HttpClient){}

    
    setUser(user) {
      return this.http.post(this.url + '/signup', user);
    }

    getUser(){
      return this.http.get(this.url + '/get-current-user');
    }

    getAllUsers(){
      return this.http.get(this.url + '/get-all-users');
    }

    sendVerificationMail(body) {
      return this.http.post(this.url + '/forget-password', body);
    }

    checkChangePasswordToken() {
      return this.http.get(this.url + '/change-password');
    }

    changeUserDetails(body) {
      return this.http.post(this.url + '/change-user-detail', body);
    }
}
