import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../core/services/user.service";
import {Store} from "@ngrx/store";
import {selectAuthError} from "../auth-store/auth.selectors";
import { AuthActions } from '../auth-store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class AppSideLoginComponent implements OnInit{
  error$ = this.store.select(selectAuthError);
  loginForm !: FormGroup;
  constructor(private fb: FormBuilder,
              private userService: UserService,
              private store: Store
  ) {}
  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  login(){
    this.store.dispatch(AuthActions.login({credentials: {email: this.loginForm.getRawValue().email,password: this.loginForm.getRawValue().password}}))
  }
}
