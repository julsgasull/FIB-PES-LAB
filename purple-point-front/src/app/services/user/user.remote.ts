import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/user.class';
import { Observable } from 'rxjs';
import { UserData } from 'src/app/models/userData.interface';

@Injectable()
export class UserRemote {
    constructor(private httpClient: HttpClient) {}

    createUser(user: UserData): Observable<User> {
        return this.httpClient.post<User>(`${environment.API_URL}/createUser`, user);
    }
}