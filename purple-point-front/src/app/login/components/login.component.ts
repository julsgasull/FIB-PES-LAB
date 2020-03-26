import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.class';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { UserData } from '../../models/userData.interface';

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
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loginFrom = this.formBuilder.group({
      email:    ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  private createUserForm() {
    debugger
    const userFormValue = JSON.parse(JSON.stringify(this.loginFrom.value));
    const userData: UserData = {
      email:    userFormValue.email,
      password: userFormValue.password
    }
    return userData;
  }

  onSubmit() {
    debugger
    this.isSubmitted = true;
    if (this.loginFrom.valid){
      this.userService.loginUser(this.createUserForm()).subscribe((response: any) => {
        //hay que redirigir
      });
      alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.loginFrom.value, null, 4));
  } else {
    return
  }
  }

  setSubmittedToFalse() { 
    this.isSubmitted = false; 
  }
  get diagnostic() {
    return JSON.stringify(this.loginFrom.value);
  }
  get formControls() {
    return this.loginFrom.controls;
  }

}