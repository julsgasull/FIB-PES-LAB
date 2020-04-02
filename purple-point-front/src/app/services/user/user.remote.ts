import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { UserData } from 'src/app/models/userData.interface';

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
        return this.httpClient.get<UserData>(`${environment.API_URL}/users/email/`+email
        );
    }
}