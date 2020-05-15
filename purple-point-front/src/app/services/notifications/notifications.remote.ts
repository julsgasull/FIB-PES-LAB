import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserData } from 'src/app/models/userData.interface';
import { UserService } from '../user/user.service';
import { GeoLocation } from 'src/app/models/geoLocation.interface';
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
        console.log("ESTOY COGIENDO LA INFO DEL USER");
        const email = localStorage.getItem('userEmail');
        this.userService.getUserByEmailUnauthorized(email).subscribe((userResponse: UserData) => {
            this.user = userResponse;
        });
        this.device.user = this.user;
    }

    getLocationInfo() {
        this.geolocation.latitude = +localStorage.getItem('latitude');
        this.geolocation.longitude = +localStorage.getItem('longitude');
        this.geolocation.accuracy = +localStorage.getItem('accuracy');
        this.geolocation.timestamp = +localStorage.getItem('timestamp');
        this.device.location = this.geolocation;
    }
 
    updateFireBaseToken(refreshedToken, oldToken): Observable<Device> {
        console.log("ESTOY EN UPDATE FB TOKEN");
        console.log("oldToken: ", oldToken);
        console.log("refreshedToken: ", refreshedToken);
        if (localStorage.getItem('token') !== 'null') { //logged user
            console.log("logged; ", localStorage.getItem('token'));
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
            console.log("unlogged update request")
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
        console.log("ESTOY REGISTRANDO EL DEVICE");
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
            console.log("HAGO LA REQUEST ISMA MIRA")
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
        console.log("Increasing number of people helped: ", email);
        return this.httpClient.put<UserData>(`${environment.API_URL}/users/increaseHelpedUsers/`+email, //endpoint a realizar
        {},
        {
        headers:{
            'Content-Type':"application/json",
            'X-Skip-Interceptor-Login': '',
        }
        });
    }

    sendNotificationToVictim(token) {
        var username: String;
        const bool: String = localStorage.getItem('token');
        if (bool == null) {
            username = localStorage.getItem('username');
            console.log("Inside if ", localStorage.getItem('token') != 'null');
        }
        else username = "";
        console.log("logged? ", localStorage.getItem('token'))
        console.log("username: ", username);
        console.log("Sending notification to victim");
        return this.httpClient.post<string>(`${environment.API_URL}/devices/notifyuser/`+token, //endpoint a realizar
        {   
            'username': username
        },
        {
        headers:{
            'Content-Type':"application/json",
            'X-Skip-Interceptor-Login': '',
        }
        });
    }

}