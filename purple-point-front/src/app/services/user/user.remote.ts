import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { UserData } from 'src/app/models/userData.interface';
import { ProfilePicData } from 'src/app/models/profilepicdata.interface';


@Injectable()
export class UserRemote {

    constructor(private httpClient: HttpClient) {}

    createUser(user: UserData): Observable<UserData> {
        return this.httpClient.post<UserData>(`${environment.API_URL}/users/register`, 
        {   
            'email':    user.email,
            'name':     user.name,
            'username': user.username,
            'password': user.password,
            'gender':   user.gender
        },
        {
            headers:{
              'Content-Type':"application/json",
              'X-Skip-Interceptor-Firebase': ''
            }
        });
    }

    login(user: UserData): Observable<UserData> {
        return this.httpClient.post<UserData>(`${environment.API_URL}/users/login`, 
        {   
            'email':    user.email,
            'password': user.password
        },
        {
            headers:{
                'X-Skip-Interceptor-Firebase': '',
                'Content-Type':"application/json"
            }
        });
    }

    getUserByEmail(email: string): Observable<UserData> {
        return this.httpClient.get<UserData>(`${environment.API_URL}/users/email/`+email);
    }

    editProfile(user: UserData): Observable<any> {
        return this.httpClient.put<UserData>(`${environment.API_URL}/users/email/`+user.email,
        {   
            'id':           user.id,
            'name':         user.name,
            'email':        user.email,
            'username':     user.username,
            'password':     user.password,
            'gender':       user.gender,
            'token':        user.token,
            'markedSpots':  user.markedSpots,
            'helpedUsers':  user.helpedUsers,
            'profilePic':   user.profilePic
        });
    }

    getUserByEmailUnauthorized(email: string) {
        console.log("GET USER UNAUTHORIZED");
        return this.httpClient.get<UserData>(`${environment.API_URL}/users/email/`+email, 
        {
            headers:{
                'X-Skip-Interceptor-Firebase': '',
                'Content-Type':"application/json"
            }
        });
    }
}