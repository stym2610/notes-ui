import { SignupFieldValidators } from './signup-field.validators';
import { Router } from '@angular/router';
import { transition, style, animate, trigger, keyframes } from '@angular/animations';
import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, fontSize: 0, transform: 'translateY(100%)'}),
        animate(500)
      ])
    ])   
  ]
})
export class SignupComponent implements OnInit {

  registeredStatus: boolean = false;
  registeredMessage: String;
  form: FormGroup;

  constructor(private service: UserService, private route: Router, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.createForm();
  }

  createForm() {
    let formModal = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
      contact: ['', [
        Validators.required,
        Validators.pattern(/^(?=[0-9]*[0-9]).{10,10}$/),
        Validators.minLength(10),
        Validators.maxLength(10)
      ]],
      password: ['', [Validators.required, Validators.pattern(/^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=[^0-9]*[0-9]).{8,}$/)]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: SignupFieldValidators.passwordsShouldMatch
    });
    return formModal;
  }

  onRegister() {
    delete this.form.value["confirmPassword"];
     this.service.setUser(this.form.value)
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

  get name() { return this.form.get('name') }
  get email() { return this.form.get('email') }
  get contact() { return this.form.get('contact') }
  get password() { return this.form.get('password') }
  get confirmPassword() { return this.form.get('confirmPassword') }

}
