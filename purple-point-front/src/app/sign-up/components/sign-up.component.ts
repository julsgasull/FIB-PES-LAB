import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.class';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from './../../common/must-match.validator';
import { UserService } from 'src/app/services/user/user.service';
import { UserData } from 'src/app/models/userData.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  genders = ['Gender', 'Male', 'Female', 'Non binary', 'Other'];
  
  user: User = new User();
  isSubmitted = false;
  userForm: FormGroup;
	constructor(
    private formBuilder: FormBuilder, 
    private userService: UserService,
    private route: Router) { }

  ngOnInit(): void {
    console.log(this.genders);
    this.userForm = this.formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
			username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      gender: [null, [Validators.required]],
    },
    {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  private createUserForm() {
    const userFormValue = JSON.parse(JSON.stringify(this.userForm.value));
    const userData: UserData = {
      email: userFormValue.email,
      username: userFormValue.username,
      password: userFormValue.password,
      gender: userFormValue.gender
    }
    return userData;
  }
  onSubmit() {
    this.isSubmitted = true;
    if (this.userForm.valid) {
      this.userService.createUser(this.createUserForm()).subscribe((response: any) => {
        this.redirectToUserInfo();
      });
      
  } else {
    return
  }
  }

  setSubmittedToFalse() {
    this.isSubmitted = false;
  }

  get formControls() { return this.userForm.controls; }

  redirectToUserInfo() {
    this.route.navigate(['/profile']);
  }

}
