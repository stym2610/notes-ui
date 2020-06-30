import { map , catchError} from 'rxjs/operators';
import { UserService } from './user.service';
import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { of } from 'rxjs/observable/of';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurd implements CanActivate {
  
  constructor(private auth: AuthenticationService, 
              private route: Router,
              private userService: UserService) {}

  canActivate(routet, state: RouterStateSnapshot){
    // if(this.userService.getUserInfo()){
    //     return true;
    // }else{
    // return this.userService.getUser()
    //     .pipe(map(userDeatails => {
    //       debugger;
    //       if(userDeatails){
    //         this.userService.setUserInfo(userDeatails);
    //         return true;
    //       } else {
    //         return false;  
    //       }
    //   }), 
    //   catchError((error) => {
    //    // this.route.navigate(['/login']);
    //     return of(false);
    //   }));
    // }
  //} 
    return false;
  }
}