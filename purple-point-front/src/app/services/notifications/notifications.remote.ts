import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class NotificationsRemote {

    constructor(private httpClient: HttpClient) {}

    saveFireBaseToken(token) {
        console.log("Saving token");
        /*return this.httpClient.put<string>(`${environment.API_URL}/device/token/`, //endpoint a realizar
        {   
            'token': token
        },
        {
        headers:{
            'Content-Type':"application/json"
        }
        });*/
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
        /*return this.httpClient.put<string>(`${environment.API_URL}/users/increaseHelpedUsers`, //endpoint a realizar
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
        /*return this.httpClient.post<string>(`${environment.API_URL}/device/notifyuser/`+token, //endpoint a realizar
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