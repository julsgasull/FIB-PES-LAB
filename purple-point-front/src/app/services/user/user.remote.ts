import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/user.class';
import { Observable } from 'rxjs';
import { UserData } from 'src/app/models/userData.interface';
import { LoginData } from 'src/app/models/loginData.interface';

@Injectable()
export class UserRemote {
    constructor(private httpClient: HttpClient) {}

    createUser(user: UserData): Observable<User> {
        return this.httpClient.post<User>(`${environment.API_URL}/createUser`, 
        {   
            'email': user.email,
            'password': user.password
        },
        {
            headers:{
              'Content-Type':"application/json"
            }
        });
    }

    login(user: UserData): Observable<LoginData> {
        debugger
        console.log(`${environment.API_URL}`)
        return this.httpClient.post<LoginData>(`${environment.API_URL}/users/login`, 
        {   
            'email': user.email,
            'password': user.password
        },
        {
            headers:{
              'Content-Type':"application/json"
            }
        });
    }
}