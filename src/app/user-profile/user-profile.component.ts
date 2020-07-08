import { Router } from '@angular/router';
import { AuthenticationService } from './../service/authentication.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  @Input("name") name: String;
  @Input("email") email:  String;

  

  constructor(private auth: AuthenticationService,
              private route: Router) { }

  ngOnInit(): void { }

  logout() {
    this.auth.logout();
    this.route.navigate(['/login']);
  }

  get firstname(){
    return this.name.split(' ')[0];
  }

}
