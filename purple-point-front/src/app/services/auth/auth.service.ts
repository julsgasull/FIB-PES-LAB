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
    //  si el token esta caducado no se debería enviar??
    // userData.token = localStorage.getItem('token');
    // quizas deberíamos usar el refreshtoken de back, pero no se
    // como gestionarlo si el token está caducado, tal vez
    // como dijimos, mirar de pedirlo siempre?
    this.userService.loginUser(userData).subscribe((response: UserData) => {
      newToken = response.token;
      localStorage.setItem('token', newToken);
    });
    
    return newToken;
  }

  public getToken(): string {
    const token = localStorage.getItem('token');
    let isTokenExpired = true;
    if (token !== 'null') {
      isTokenExpired = this.decoder.isTokenExpired(token);
    }
    if (!isTokenExpired) {
      return token;
    } return this.refreshToken();
  }
}
