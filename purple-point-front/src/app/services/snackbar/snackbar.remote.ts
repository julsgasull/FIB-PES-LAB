import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar, 
         MatSnackBarConfig, 
         MatSnackBarHorizontalPosition, 
         MatSnackBarVerticalPosition
        } from '@angular/material/snack-bar';
import { SnackbarComponent } from 'src/app/common/components/snackbar/components/snackbar.component';
import { pushData } from 'src/app/models/pushdata.interface';
import { TranslateService } from '@ngx-translate/core';
import { SimpleSnackbarComponent } from 'src/app/common/components/simple-snackbar/components/simple-snackbar.component';

@Injectable()
export class SnackbarRemote {

    pData: pushData = {longitude: "", latitude: "", token: ""};

    constructor(private httpClient: HttpClient,
                private snackbar: MatSnackBar,
                private translate: TranslateService,
                private zone: NgZone) {}

    openSnackbar(data) {
        this.zone.run(() => {
            let title = this.translate.instant(data.title);
            let message = this.translate.instant(data.body);
            const notification: string = (title+'\n'+message);
            this.pData.latitude = data.latitude;
            this.pData.longitude = data.longitude;
            this.pData.token = data.token;
            console.log("data: ");
            console.log(data);
            console.log("---------------------")
            this.saveData(data);
            const snackbarRef = this.snackbar.openFromComponent(
                SnackbarComponent, 
                {
                    data:  notification,
                    panelClass: ['snackbar'],
                    politeness: 'polite'
                });
        });
    }

    saveData(data) {
        this.pData.latitude = data.latitude;
        this.pData.longitude = data.longitude;
        this.pData.token = data.token;
        localStorage.setItem('p_lat', this.pData.latitude);
        localStorage.setItem('p_lon', this.pData.longitude);
        localStorage.setItem('p_token', this.pData.token);
    }

    openSimpleSnackBar(data) {
        let user = data.username;
        let message = this.translate.instant(data.body);
        const notification = user+message;

        const snackbarRef = this.snackbar.openFromComponent(
            SimpleSnackbarComponent, 
            {
                data:  notification,
                // duration: 5000,
                panelClass: ['snackbar'],
                politeness: 'polite'
            });
    }
}