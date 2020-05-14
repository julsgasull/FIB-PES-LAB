import { Injectable } from '@angular/core';
import { SnackbarRemote } from './snackbar.remote';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackbarRemote: SnackbarRemote) { }

  openSnackbar(data) {
    this.snackbarRemote.openSnackbar(data);
  }

}
