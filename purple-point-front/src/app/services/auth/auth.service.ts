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
    userData.email     = localStorage.getItem('userEmail');
    userData.password  = localStorage.getItem('password');
    userData.token     = localStorage.getItem('token');
    
    this.userService.loginUser(userData).subscribe((response: UserData) => {
      newToken = response.token;
      localStorage.setItem('token', newToken);
    });
    
    return newToken;
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
