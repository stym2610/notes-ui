import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from './../service/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  form;
  isError: boolean;
  isSuccess: boolean;

  constructor(private userService: UserService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.createForm();
  }

  createForm(){
    let formModal = this.fb.group({
      email: ['', Validators.required]
    });
    return formModal;
  }

  sendVerificationMail() {
    let body = {
      email: this.email.value
    };
    this.userService.sendVerificationMail(body)
      .subscribe((response: any) => {
        this.isSuccess = response.status;
        this.isError = false;
      }, response => {
        this.isError = !response.error.status;
        this.isSuccess = false;
      });
  }

  get email(){
    return this.form.get('email');
  }

}
