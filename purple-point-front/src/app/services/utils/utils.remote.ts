import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js'; 
@Injectable({
  providedIn: 'root'
})
export class UtilsRemote {

  constructor() { }

  encryptSha256(text : string) {
      return CryptoJS.SHA256(text).toString();
  }
}
