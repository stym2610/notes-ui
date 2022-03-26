import { AuthenticationService } from '../service/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  subscriptions: Subscription[] = [];
  invalidLogin: boolean;

  constructor(private auth: AuthenticationService, private route: Router) { }

  ngOnInit(): void { }

  submit(formValue) {
    this.invalidLogin = false;
    let subscription = this.auth.login(formValue)
      .subscribe(result => {
        if(result){
          this.route.navigate(['']);
        }
      }, error => {
        this.invalidLogin = true;
      });
    this.subscriptions.push(subscription);  
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
