import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from './../../common/must-match.validator';
import { UserService } from 'src/app/services/user/user.service';
import { UserData } from 'src/app/models/userData.interface';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/services/utils/utils.service'

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  genders = ['Gender', 'Male', 'Female', 'Non binary', 'Other'];
  
  isSubmitted = false;
  userForm: FormGroup;
	constructor(
    private formBuilder: FormBuilder, 
    private userService: UserService,
    private route: Router,
    private utilsService : UtilsService) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
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
      name: userFormValue.name,
      username: userFormValue.username,
      password: this.utilsService.encryptSha256(userFormValue.password),
      gender: userFormValue.gender
    }
    return userData;
  }
  onSubmit() {
    this.isSubmitted = true;
    if (this.userForm.valid) {
      this.userService.createUser(this.createUserForm()).subscribe((response: any) => {
        this.redirectToLogin();
      });
      
  } else {
    return
  }
  }

  setSubmittedToFalse() {
    this.isSubmitted = false;
  }

  get formControls() { return this.userForm.controls; }

  redirectToLogin() {
    this.route.navigate(['/login']);
  }

}
