import { UserService } from './user.service';
import { CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AdminPageGaurdService implements CanActivate {

  isAdmin;

  constructor(private userService: UserService, private route: Router) { }

  canActivate(){
    return this.userService.getUser()
      .pipe(
        map((userInfo: any) => {
          if(userInfo.admin)
            return true;
          else
            return false;  
        }),
        catchError((error: any) => {
          this.route.navigate(['./login']);
          return of(false);
        })
      );
  }
}
