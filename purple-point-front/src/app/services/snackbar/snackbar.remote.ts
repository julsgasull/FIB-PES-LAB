import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar, 
         MatSnackBarConfig, 
         MatSnackBarHorizontalPosition, 
         MatSnackBarVerticalPosition
        } from '@angular/material/snack-bar';
import { SnackbarComponent } from 'src/app/common/components/snackbar/snackbar.component';

@Injectable()
export class SnackbarRemote {

    constructor(private httpClient: HttpClient,
                private snackbar: MatSnackBar,
                private zone: NgZone) {}

    openSnackbar(title, message, data) {
        this.zone.run(() => {
            const notification: string = title+'\n'+message;
            console.log(data);
            const snackbarRef = this.snackbar.openFromComponent(
                SnackbarComponent, 
                {
                    data:  notification,
                    panelClass: ['snackbar'],
                    politeness: 'polite'
                });
            //this.showMap(data);
        });
    }

    incrementHelped() {
        console.log("Incremented!");
    }

    sendNotif(data) {
        console.log("Sent!");
    }

    showMap(data) {
        console.log("Here we treat the notification's action");
        console.log("First we increment the user's helped value for the helper");
        this.incrementHelped();
        console.log("Then we send a notification to the victim");
        this.sendNotif(data);
        console.log("Last but not least, we redirect to the map with the victim's location");
    }    
}