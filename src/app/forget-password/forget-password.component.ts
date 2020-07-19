import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from './../service/user.service';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import *  as NotesActions from '../store/actions';

@Component({
  selector: 'forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  form;
  isError: boolean;
  isSuccess: boolean;

  constructor(private userService: UserService, private fb: FormBuilder, private store: Store<any>) { }

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
    this.store.dispatch(new NotesActions.LoadingStarted);
    this.isSuccess = this.isError = false;
    let body = {
      email: this.email.value
    };
    this.userService.sendVerificationMail(body)
      .subscribe((response: any) => {
        this.store.dispatch(new NotesActions.LoadingCompleted);
        this.isSuccess = response.status;
        this.isError = false;
      }, response => {
        this.store.dispatch(new NotesActions.LoadingCompleted);
        this.isError = !response.error.status;
        this.isSuccess = false;
      });
  }

  get email(){
    return this.form.get('email');
  }

}
