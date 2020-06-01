import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { UserData } from 'src/app/models/userData.interface';
import { catchError } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';


@Injectable()
export class UserRemote {

    constructor(
        private httpClient: HttpClient,
        private translate: TranslateService,) {}

    createUser(user: UserData): Observable<any> {
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
              'X-Skip-Interceptor-Login': ''
            }
        }).pipe(
            catchError(this.handleError<any>())
          );
    }

    private handleError<T>(result?: T) {
        return (error: any): Observable<T> => {
            if (error.status === 400) {
                alert(this.translate.instant('alerts.alreadyExists'));
                location.reload();
                return of(error as T);
            }  
            else {
                alert(this.translate.instant('alerts.tryLater'));
                location.reload();
                return of(error as T);
              } 
        }
      }

    login(user: UserData): Observable<UserData> {
        return this.httpClient.post<UserData>(`${environment.API_URL}/users/login`, 
        {   
            'email':    user.email,
            'password': user.password
        },
        {
            headers:{
                'X-Skip-Interceptor-Login': '',
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
        return this.httpClient.get<UserData>(`${environment.API_URL}/users/email/`+email, 
        {
            headers:{
                'X-Skip-Interceptor-Login': '',
                'Content-Type':"application/json"
            }
        });
    }
}