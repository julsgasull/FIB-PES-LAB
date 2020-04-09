import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { UserData } from 'src/app/models/userData.interface';
import { UserRemote } from './user.remote';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor (
    private userRemote: UserRemote
  ) { }

  loginUser(user: UserData): Observable<UserData> {
    return this.userRemote.login(user);
  }

  createUser(user: UserData): Observable<UserData> {
    return this.userRemote.createUser(user);
  }

  getUserByEmail(email: string): Observable<UserData> {
    return this.userRemote.getUserByEmail(email);
  }

  logoutUser(userInfo: UserData) {
    userInfo.token = null;
    localStorage.setItem('token', null); 
  }

}
