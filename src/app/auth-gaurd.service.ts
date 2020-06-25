import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurd implements CanActivate {
  
  constructor(private auth: AuthenticationService, private route: Router) {}

  canActivate(routet, state: RouterStateSnapshot){
    // if(this.auth.isLoggedIn()) return true;
    // this.route.navigate(['/login'], { queryParams: { error: 'login-first' } });
    return false;
  } 
}
