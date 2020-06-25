import { Router } from '@angular/router';
import { transition, style, animate, trigger, keyframes } from '@angular/animations';
import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0}),
        animate(500)
      ])
    ])   
  ]
})
export class SignupComponent implements OnInit {

  registeredStatus: boolean;
  registeredMessage: String;

  constructor(private service: UserService, private route: Router) {}

  ngOnInit(): void {
  }

  onRegister(formValue) {
    delete formValue["confirmPassword"];
    this.service.setUser(formValue)
      .subscribe( (response: any) => {
        this.registeredMessage = response.message;
        this.registeredStatus = response.status;
        setTimeout(() => {
          this.route.navigate(['/login']);
        }, 2000);
      }, error => {
        alert("Unexpected error occured");
      });
  }

}
