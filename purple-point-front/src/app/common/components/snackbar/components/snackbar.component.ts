import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { pushData } from 'src/app/models/pushdata.interface';
import { NotificationsService } from 'src/app/services/notifications/notifications.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  //styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit {

  pushData: pushData = {latitude: "", longitude: "", token: ""};

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any,
              private snackRef: MatSnackBarRef<SnackbarComponent>,
              private notificationsService: NotificationsService,
              private route: Router) { }

  ngOnInit(): void {}

  getData() {
    this.pushData.latitude  = localStorage.getItem('p_lat');
    this.pushData.longitude = localStorage.getItem('p_lon');
    this.pushData.token     = localStorage.getItem('p_token');
  }

  showMap() {
    if (localStorage.getItem('token') !== 'null') { //logged user
      this.notificationsService.increaseHelped().subscribe((response) => {},
      (error) => { console.log("error: ", error); }
      );
    }
    
    this.notificationsService.sendNotificationToVictim(this.pushData.token).subscribe((response) => {},
    (error) => { console.log("error: ", error); }
    );
    
    this.dismiss();
    this.redirectToMapOnPanic(this.pushData.latitude, this.pushData.longitude);
  } 
  
  onMyWayAction() {
    this.getData();
    this.showMap();
  }

  dismiss() {
    this.snackRef.dismiss();
  }

  redirectToMapOnPanic(lat: string, lng: string) {
    this.route.navigate(['/maponpanic', lat, lng]);
  }

}
