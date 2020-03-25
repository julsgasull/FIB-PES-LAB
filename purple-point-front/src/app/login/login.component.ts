import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.class';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user/user.service';
import { UserData } from 'src/app/models/userData.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: User = new User();
  isSubmitted = false;
  userForm: FormGroup;

  constructor (
    private formBuilder: FormBuilder,
    private userService: UserService
  ) { }
  
  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  private createUserForm() {
    const userFormValue = JSON.parse(JSON.stringify(this.userForm.value.detail));
    const userData: UserData = {
      email: userFormValue.email,
      password: userFormValue.password
    }
    return userData;
  }

  onSubmit() { 
    debugger
    this.isSubmitted = true; 
    if (this.userForm.valid) {
      this.userService.loginUser();
    } else {
      return;
    }
  }
  
  setSubmittedToFalse() {
    this.isSubmitted = false;
  }

  get diagnostic() { return JSON.stringify(this.userForm.value); }
  get formControls() { return this.userForm.controls; }
}