import { Injectable } from '@angular/core';
import { UtilsRemote } from './utils.remote';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private utilsRemote: UtilsRemote
  ) {
   }

  encryptSha256(text : string) {
    return this.utilsRemote.encryptSha256(text)
  }
}
