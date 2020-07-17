import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from './../service/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SignupFieldValidators } from '../signup/signup-field.validators';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
  animations: [
    trigger('enterFromBottom', [
      transition(':enter', [
        style({ opacity: 0, fontSize: 0, transform: 'translateY(277px)'}),
        animate(500)
      ])
    ])   
  ]
})
export class ChangePasswordComponent implements OnInit {

  form;
  userDetails;
  isTokenValid: boolean = false;
  errorStatus: boolean = false;
  token;
  changePasswordRequestStatus: boolean;
  changePasswordRequestMessage: string;

  constructor(private router: ActivatedRoute,
              private userService: UserService,
              private fb: FormBuilder,
              private route: Router) {}

  ngOnInit() {
    this.router.queryParams.subscribe(({token}) => {
      if(token)
        this.token = token;
    });
    if(this.token){
      localStorage.setItem('token', this.token);
      this.userService.checkChangePasswordToken()
        .subscribe((response: any) => {
          this.isTokenValid = response.status;
          this.form = this.createForm();
        }, error => {
          this.errorStatus = true;
        });
    } else {
      this.errorStatus = true;
      this.isTokenValid = false;
    }
  }

  createForm() {
    let formModal = this.fb.group({
      password: ['', [Validators.required, Validators.pattern(/^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=[^0-9]*[0-9]).{8,}$/)]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: SignupFieldValidators.passwordsShouldMatch
    });
    return formModal;
  }

  changeUserDetails(){
    this.userService.getUser()
      .subscribe(userDetails => {
        this.userDetails = userDetails;
        this.userDetails["password"] = this.password.value;
        this.userService.changeUserDetails(this.userDetails)
          .subscribe((response: any) => {
            this.changePasswordRequestStatus = response.status;
            this.changePasswordRequestMessage = response.message;
            debugger;
            setTimeout(() => {
              this.route.navigate(['/login']);
            }, 2000);
          }, error => {
            this.changePasswordRequestStatus = !error.error.status;
            this.changePasswordRequestMessage = error.error.message;
          });
      });
  }

  get password() { return this.form.get('password') }
  get confirmPassword() { return this.form.get('confirmPassword') }

}
