import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from '../user/user.service';
import { UserData } from 'src/app/models/userData.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private decoder:      JwtHelperService;
  private userService:  UserService;
  private userData:     UserData;
  
  private newToken:     string;

  constructor() {}

  private refreshToken(): string {
    this.userData.email     = localStorage.getItem('userEmail');
    this.userData.password  = localStorage.getItem('password');
    this.userData.token     = localStorage.getItem('token');
    
    this.userService.loginUser(this.userData).subscribe((response: UserData) => {
      this.newToken = response.token;
      localStorage.setItem('token', this.newToken);
    });
    
    return this.newToken;
  }

  public getToken(): string {
    const token           = localStorage.getItem('token');
    
    this.decoder          = new JwtHelperService();
    const isTokenExpired  = this.decoder.isTokenExpired(token);

    if (!isTokenExpired) {
      return token;
    } return this.refreshToken();
  }
}
