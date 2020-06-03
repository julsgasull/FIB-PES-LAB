import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { UserData } from 'src/app/models/userData.interface';
import { UserRemote } from './user.remote';
import { ProfilePicData } from 'src/app/models/profilepicdata.interface';

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

  createUser(user: UserData): Observable<any> {
    return this.userRemote.createUser(user);
  }

  getUserByEmail(email: string): Observable<any> {
    return this.userRemote.getUserByEmail(email);
  }

  editProfile(user: UserData): Observable<any> {
    return this.userRemote.editProfile(user);
  }
  
  getUserByEmailUnauthorized(email: string): Observable<UserData> {
    return this.userRemote.getUserByEmailUnauthorized(email);
  }
}
