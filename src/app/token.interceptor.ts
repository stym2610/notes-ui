import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AuthenticationService } from './service/authentication.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import 'rxjs/add/operator/do'
import * as NotesActions from "./store/actions";



@Injectable()

export class TokenInterceptor implements HttpInterceptor{

    constructor(private auth: AuthenticationService, private route: Router, private store: Store<any> ){}

    intercept(request: HttpRequest<any>, next: HttpHandler): any{
       let token = this.auth.Token;
       const headerSettings = {};

       for(const key of request.headers.keys()) {
           headerSettings[key] = request.headers.getAll(key);
       }

       if(token) {
           headerSettings['token'] = token;
       }

       headerSettings['Content-Type'] = 'application/json';
       const newHeader = new HttpHeaders(headerSettings);
        request = request.clone({
            headers: newHeader
        });

        return next.handle(request).do( response => {},  error => {  
            this.store.dispatch(new NotesActions.RequestFailure());
            if(error.status == 401) {
                this.route.navigate(['/login']);
            }
        });
    }
}