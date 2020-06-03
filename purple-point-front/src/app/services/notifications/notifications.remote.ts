import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserData } from 'src/app/models/userdata.interface';
import { UserService } from './../user/user.service';
import { GeoLocation } from 'src/app/models/geolocation.interface';
import { Device } from 'src/app/models/device.interface';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class NotificationsRemote {

    constructor(private httpClient: HttpClient,
                private userService: UserService) {}

    device: Device = {
        user: null,
        location: null,
        firebaseToken: null
    };

    user: UserData;
    geolocation: GeoLocation = ({
        latitude: -1, 
        longitude: -1, 
        accuracy: -1,
        timestamp: -1
      });

    getUserInfo() {
        const email = localStorage.getItem('userEmail');
        this.userService.getUserByEmailUnauthorized(email).subscribe((userResponse: UserData) => {
            this.user = userResponse;
            this.device.user = this.user;
        });
    }

    getLocationInfo() {
        this.geolocation.latitude = +localStorage.getItem('latitude');
        this.geolocation.longitude = +localStorage.getItem('longitude');
        this.geolocation.accuracy = +localStorage.getItem('accuracy');
        this.geolocation.timestamp = +localStorage.getItem('timestamp');
        this.device.location = this.geolocation;
    }
 
    updateFireBaseToken(refreshedToken, oldToken): Observable<Device> {
        if (localStorage.getItem('token') !== 'null') { //logged user
            this.getUserInfo();
            return this.httpClient.put<Device>(`${environment.API_URL}/devices/`+oldToken, //endpoint a realizar
            {   
                'firebaseToken':    refreshedToken,
                "location": {
                    'latitude':         this.geolocation.latitude,
                    'longitude':        this.geolocation.longitude,
                    'accuracy':         this.geolocation.accuracy,
                    'timestamp':        this.geolocation.timestamp
                },
                "user": {
                    'id':               this.user.id,
                    'name':             this.user.name,
                    'email':            this.user.email,
                    'username':         this.user.username,
                    'password':         this.user.password,
                    'gender':           this.user.gender,
                    'token':            this.user.token,
                    'markedSpots':      this.user.markedSpots,
                    'helpedUsers':      this.user.helpedUsers,
                    'profilePic':       this.user.profilePic
                }
            },
            {
            headers:{
                'Content-Type':"application/json",
                'X-Skip-Interceptor-Login': ''
            }
            });
        } else { // unlogged user
            return this.httpClient.put<Device>(`${environment.API_URL}/devices/`+oldToken, //endpoint a realizar
            {   
                'firebaseToken':    refreshedToken,
                "location": {
                    'latitude':     this.geolocation.latitude,
                    'longitude':    this.geolocation.longitude,
                    'accuracy':     this.geolocation.accuracy,
                    'timestamp':    this.geolocation.timestamp
                },
                'user':     null
            },
            {
            headers:{
                'Content-Type':"application/json",
                'X-Skip-Interceptor-Login': ''
            }
            });
        }
    }

    registerFirebaseToken(refreshedToken): Observable<Device> {
        this.getLocationInfo();
        if (localStorage.getItem('token') !== 'null') { //logged user
            this.getUserInfo();
            return this.httpClient.post<Device>(`${environment.API_URL}/devices`, //endpoint a realizar
            {   
                'firebaseToken':    refreshedToken,
                "location": {
                    'latitude':         this.geolocation.latitude,
                    'longitude':        this.geolocation.longitude,
                    'accuracy':         this.geolocation.accuracy,
                    'timestamp':        this.geolocation.timestamp
                },
                "user": {
                    'id':               this.user.id,
                    'name':             this.user.name,
                    'email':            this.user.email,
                    'username':         this.user.username,
                    'password':         this.user.password,
                    'gender':           this.user.gender,
                    'token':            this.user.token,
                    'markedSpots':      this.user.markedSpots,
                    'helpedUsers':      this.user.helpedUsers,
                    'profilePic':       this.user.profilePic
                }
            },
            {
            headers:{
                'Content-Type':"application/json",
                'X-Skip-Interceptor-Login': '',
            }
            });
        } else { // unlogged user
            return this.httpClient.post<Device>(`${environment.API_URL}/devices`, //endpoint a realizar
            {   
                'firebaseToken':    refreshedToken,
                "location": {
                    'latitude':         this.geolocation.latitude,
                    'longitude':        this.geolocation.longitude,
                    'accuracy':         this.geolocation.accuracy,
                    'timestamp':        this.geolocation.timestamp
                },
                "user": null
            },
            {
            headers:{
                'Content-Type':"application/json",
                'X-Skip-Interceptor-Login': '',
            }
            });
        }
    }

    increaseHelped(): Observable<UserData> {
        var username: String;
        var email: String;
        if (localStorage.getItem('token') != 'null') { //logged user
            username = localStorage.getItem('username');
            email = localStorage.getItem('userEmail');
        }
        return this.httpClient.put<UserData>(`${environment.API_URL}/users/increaseHelpedUsers/`+email, //endpoint a realizar
        {},
        {
        headers:{
            'Content-Type':"application/json",
            'X-Skip-Interceptor-Login': '',
        }
        });
    }

    sendNotificationToVictim(token): Observable<string> {
        var username: String;
        const bool: String = localStorage.getItem('token');
        if (bool == null) username = localStorage.getItem('username');
        else username = "";
        return this.httpClient.post<string>(`${environment.API_URL}/devices/notifyuser/`+token, //endpoint a realizar
        {   
            'username': username
        },
        {
        headers:{
            'Content-Type':"application/json",
            'X-Skip-Interceptor-Login': ''
        }
        });
    }

}