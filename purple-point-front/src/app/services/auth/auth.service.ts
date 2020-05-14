import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from '../user/user.service';
import { UserData } from 'src/app/models/userData.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(
    private decoder:      JwtHelperService,
    private userService:  UserService
  ) {}

  private refreshToken(): string {
    let newToken: string;
    let userData: UserData = {email: '', password: ''};
    userData.email = localStorage.getItem('userEmail');
    userData.password = localStorage.getItem('password');
    console.log("Estas en auth refresh token");
    this.userService.loginUser(userData).subscribe((response: UserData) => {
      newToken = response.token;
      localStorage.setItem('token', newToken);
    });
    
    return newToken;
  }

  public getToken(): string {
    const token = localStorage.getItem('token');
    const disable = localStorage.getItem('disable');
    let isTokenExpired = true;
    if (token !== 'null') {
      isTokenExpired = this.decoder.isTokenExpired(token);
    }
    if (!isTokenExpired) {
      return token;
    } 
    else if(disable !== 'null') return this.refreshToken();
  }

  public getDeviceToken(): string {
    return localStorage.getItem('deviceToken');
  }
}
