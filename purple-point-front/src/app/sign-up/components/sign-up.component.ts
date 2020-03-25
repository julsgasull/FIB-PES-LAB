import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.class';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from './../../common/must-match.validator';
import { UserService } from 'src/app/services/user/user.service';
import { UserData } from 'src/app/models/userData.interface';

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
    private userService: UserService) { }

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
    const userFormValue = JSON.parse(JSON.stringify(this.userForm.value.detail));
    const userData: UserData = {
      email: userFormValue.email,
      username: userFormValue.username,
      password: userFormValue.password,
      gender: userFormValue.gender
    }
    return userData;
  }
  onSubmit() {
    debugger
    this.isSubmitted = true;
    if (this.userForm.valid) {
      this.userService.createUser(this.createUserForm()).subscribe((response: any) => {
        //hay que redirigir
      });
      alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.userForm.value, null, 4));
  } else {
    return
  }
  }

  setSubmittedToFalse() {
    this.isSubmitted = false;
  }

  get diagnostic() { return JSON.stringify(this.userForm.value); }

  get formControls() { return this.userForm.controls; }

}