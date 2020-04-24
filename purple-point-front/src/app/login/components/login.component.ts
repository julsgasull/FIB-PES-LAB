import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { UserData } from '../../models/userData.interface';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public isSubmitted = false;
  public loginFrom: FormGroup;
  public wrongCredentials = false;
  public internalError = false;

  constructor (
    private formBuilder: FormBuilder,
    private userService: UserService,
    private route: Router,
    private utilsService : UtilsService
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
      password: this.utilsService.encryptSha256(userFormValue.password)
    }
    return userData;
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.loginFrom.valid){
      // How to do a request
      this.userService.loginUser(this.createUserForm()).subscribe((response: UserData) => {
        localStorage.setItem('userEmail', response.email);
        localStorage.setItem('password', response.password);
        localStorage.setItem('token', response.token);
        localStorage.setItem('username', response.username)
        this.redirectToMainMenu();
      },
      errorrResponse => {
        if (errorrResponse.status == 403 || errorrResponse.status == 404)this.wrongCredentials = true;
        else this.internalError= true;
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

  redirectToMainMenu() {
    this.route.navigate(['/mainmenu']);
  }

}