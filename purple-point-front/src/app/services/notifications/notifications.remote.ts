import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserData } from 'src/app/models/userData.interface';
import { UserService } from '../user/user.service';

@Injectable()
export class NotificationsRemote {

    constructor(private httpClient: HttpClient,
                private userService: UserService) {}

    user: UserData;

    getUserInfo() {
        const email = localStorage.getItem('userEmail');
        this.userService.getUserByEmail(email).subscribe((userResponse: UserData) => {
            this.user = userResponse;
        });
    }

    updateFireBaseToken(refreshedToken, oldToken) {
        if (localStorage.getItem('token') !== null) { //logged user
            this.getUserInfo();
            /*return this.httpClient.put<string>(`${environment.API_URL}/devices/`+oldToken, //endpoint a realizar
            {   
                'firebaseToken':    refreshedToken
                'location':         null
                'id':               this.user.id,
                'name':             this.user.name,
                'email':            this.user.email,
                'username':         this.user.username;
                'password':         this.user.password,
                'gender':           this.user.gender,
                'token':            this.user.token,
                'markedSpots':      this.user.markedSpots,
                'helpedUsers':      this.user.helpedUsers,
                'profilePic':       this.user.profilePic
            },
            {
            headers:{
                'Content-Type':"application/json"
            }
            });*/
        } else { // unlogged user
            /*return this.httpClient.put<string>(`${environment.API_URL}/devices/`+oldToken, //endpoint a realizar
            {   
                'firebaseToken':    refreshedToken
                'location':         null
                'user':             null
            },
            {
            headers:{
                'Content-Type':"application/json"
            }
            });*/
        }
    }

    registerFirebaseToken(token) {
        if (localStorage.getItem('token') !== null) { //logged user
            this.getUserInfo();
            /*return this.httpClient.put<string>(`${environment.API_URL}/devices`, //endpoint a realizar
            {   
                'firebaseToken':    refreshedToken
                'location':         null
                'id':               this.user.id,
                'name':             this.user.name,
                'email':            this.user.email,
                'username':         this.user.username;
                'password':         this.user.password,
                'gender':           this.user.gender,
                'token':            this.user.token,
                'markedSpots':      this.user.markedSpots,
                'helpedUsers':      this.user.helpedUsers,
                'profilePic':       this.user.profilePic
            },
            {
            headers:{
                'Content-Type':"application/json"
            }
            });*/
        } else { // unlogged user
            /*return this.httpClient.put<string>(`${environment.API_URL}/devices`, //endpoint a realizar
            {   
                'firebaseToken':    refreshedToken
                'location':         null
                'user':             null
            },
            {
            headers:{
                'Content-Type':"application/json"
            }
            });*/
        }
    }

    increaseHelped(){
        var username: String;
        var email: String;
        if (localStorage.getItem('token') != null) { //logged user
            username = localStorage.getItem('username');
            email = localStorage.getItem('userEmail');
        }

        // console.log("logged? ", localStorage.getItem('token'))
        // console.log("username: ", username);
        // console.log("email: ", email);

        console.log("Increasing number of people helped");
        /*return this.httpClient.put<string>(`${environment.API_URL}/users/increaseHelpedUsers/`+email, //endpoint a realizar
        {   
            'email': email
        },
        {
        headers:{
            'Content-Type':"application/json"
        }
        });*/
    }

    sendNotificationToVictim(token) {
        var username: String;
        const bool: String = localStorage.getItem('token');
        if (bool == null) {
            username = localStorage.getItem('username');
            console.log("Inside if ", localStorage.getItem('token') != null);
        }
        else username = "";
        console.log("logged? ", localStorage.getItem('token'))
        console.log("username: ", username);
        console.log("Sending notification to victim");
        /*return this.httpClient.post<string>(`${environment.API_URL}/devices/notifyuser/`+token, //endpoint a realizar
        {   
            'username': username
        },
        {
        headers:{
            'Content-Type':"application/json"
        }
        });*/
    }

}