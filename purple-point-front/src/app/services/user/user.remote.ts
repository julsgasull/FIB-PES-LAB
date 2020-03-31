import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/user.class';
import { Observable } from 'rxjs';
import { UserData } from 'src/app/models/userData.interface';
import { LoginData } from 'src/app/models/loginData.interface';

@Injectable()
export class UserRemote {

    constructor(private httpClient: HttpClient) {}

    createUser(user: UserData): Observable<UserData> {
        return this.httpClient.post<UserData>(`${environment.API_URL}/users/register`, 
        {   
            'email': user.email,
            'username': user.username,
            'password': user.password,
            'gender': user.gender
        },
        {
            headers:{
              'Content-Type':"application/json"
            }
        });
    }

    login(user: UserData): Observable<UserData> {
        return this.httpClient.post<UserData>(`${environment.API_URL}/users/login`, 
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

    getUserByEmail(email: string): Observable<UserData> {
        const params = new HttpParams().set('email', email);
        return this.httpClient.get<UserData>(`${environment.API_URL}/users/email`,
        {params: params}
        );
    }
}