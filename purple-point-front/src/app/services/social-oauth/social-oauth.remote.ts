import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { UserData } from 'src/app/models/userData.interface';
import {UserService } from 'src/app/services/user/user.service'
import { useAnimation } from '@angular/animations';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class SocialOauthRemote {
  

  constructor(
    public afAuth: AngularFireAuth,
    private route: Router,
    private userService: UserService
        ){}


  doGoogleLogin(){
    
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      provider.addScope('https://www.googleapis.com/auth/user.gender.read')
      this.afAuth.auth
      .signInWithPopup(provider)
      .then(res => {
        resolve(res);
      })
    })

  }
  socialLogin(){
    console.log("VAIG A FER SOCIAL");
    var res = this.doGoogleLogin();
    res.then((value)=>{
      console.log(value)
      const user: UserData = {
       email: value.user.email,
       username: value.additionalUserInfo.profile.name,
       password: value.user.uid,
       gender: "other",
    } 
    console.log(user);
    this.login_or_register(user)

    })
  }

  login_or_register(user: UserData){
    this.userService.loginUser(user).subscribe((response: UserData) => {
      console.log("login bo")
      console.log(response)
      this.route.navigate(['/mainmenu']);
    },
    errorrResponse => {
      console.log("login fallido");
      this.userService.createUser(user).subscribe((response: UserData) => {
        console.log("registre bo")
        this.userService.loginUser(user).subscribe((response: UserData) => {
          console.log("login de registre  bo")
          localStorage.setItem('userEmail', response.email);
          localStorage.setItem('password', response.password);
          localStorage.setItem('token', response.token);
          localStorage.setitem('name', response.username);
          localStorage.setItem('username', response.username)
          this.route.navigate(['/mainmenu']);
      },
      errorrResponse=>{
        console.log(alert("sistem error"))
      });
    },
    errorrResponse=>{
      console.log(alert("sistem error"))
      console.log("registre malament")
    });
    });
  }
}