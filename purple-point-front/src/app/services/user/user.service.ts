import { Injectable } from '@angular/core';
import { User } from '../../models/user.class';
import { Observable } from 'rxjs';
import { UserData } from 'src/app/models/userData.interface';
import { UserRemote } from './user.remote';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  loginUser() {
    throw new Error("Method not implemented.");
  }

  constructor(private userRemote: UserRemote) { }

  createUser(user: UserData): Observable<User> {
    return this.userRemote.createUser(user);
  }
}