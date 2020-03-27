import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.class';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { UserData } from '../../models/userData.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: User = new User();
  isSubmitted = false;
  loginFrom: FormGroup;

  constructor (
    private formBuilder: FormBuilder,
    private userService: UserService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.loginFrom = this.formBuilder.group({
      email:    ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  private createUserForm() {
    const userFormValue = JSON.parse(JSON.stringify(this.loginFrom.value));
    const userData: UserData = {
      email:    userFormValue.email,
      password: userFormValue.password
    }
    return userData;
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.loginFrom.valid){
      console.log("login form is valid")
      this.userService.loginUser(this.createUserForm()).subscribe((response: any) => {
        console.log("redirect to user info")
        this.redirectToUserInfo();
      });
    } else {
      alert("not authenticated");
    }
  }

  setSubmittedToFalse() { 
    this.isSubmitted = false; 
  }

  get formControls() {
    return this.loginFrom.controls;
  }

  redirectToUserInfo() {
    this.route.navigate(['/profile']);
  }

}