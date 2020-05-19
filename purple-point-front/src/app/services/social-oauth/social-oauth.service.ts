import { Injectable } from '@angular/core';
import { SocialOauthRemote} from './social-oauth.remote'

@Injectable({
  providedIn: 'root'
})
export class SocialOauthService {

  constructor(
    private socialOauthRemote: SocialOauthRemote
  ) { }

  doGoogleLogin(){
    return this.socialOauthRemote.doGoogleLogin()
  }
}
