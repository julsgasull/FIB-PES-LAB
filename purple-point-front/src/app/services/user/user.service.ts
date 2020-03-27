import { Injectable } from '@angular/core';
import { User } from '../../models/user.class';
import { Observable } from 'rxjs';
import { UserData } from 'src/app/models/userData.interface';
import { UserRemote } from './user.remote';
import { LoginData } from 'src/app/models/loginData.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private userRemote: UserRemote) { }

  loginUser(user: UserData): Observable<LoginData> {
    return this.userRemote.login(user);
  }

  createUser(user: UserData): Observable<User> {
    return this.userRemote.createUser(user);
  }
}
