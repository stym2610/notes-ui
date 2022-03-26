import { JwtHelper } from 'angular2-jwt';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as NotesActions from '../store/actions'
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import { NOTE } from '../add-note';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  constructor(private http: HttpClient, private store: Store<any>) {}

  // private url = environment.API_URL;

  // private url = "https://notes--app-api.herokuapp.com";
  private url = "http://localhost:3001";

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
    this.store.dispatch(new NotesActions.Logout());
    localStorage.removeItem('token');
  }

  get currentUser() {
    let token = localStorage.getItem('token');
    return new JwtHelper().decodeToken(token);
  }
}
