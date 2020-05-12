import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar, 
         MatSnackBarConfig, 
         MatSnackBarHorizontalPosition, 
         MatSnackBarVerticalPosition
        } from '@angular/material/snack-bar';

@Injectable()
export class SnackbarRemote {

    constructor(private httpClient: HttpClient,
                private snackbar: MatSnackBar) {}

    openSnackbar(title, message) {
        console.log("Inside snackBar remote \n", title, message);
        this.snackbar.open(title+'\n'+message,
                           'I\'m OMW', 
                           { panelClass: ['snackbar'], duration: 10000 });
    }
}