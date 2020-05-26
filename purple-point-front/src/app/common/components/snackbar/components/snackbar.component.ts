import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { pushData } from 'src/app/models/pushdata.interface';
import { NotificationsService } from 'src/app/services/notifications/notifications.service';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  //styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit {

  pushData: pushData = {latitude: "", longitude: "", token: ""};

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any,
              private snackRef: MatSnackBarRef<SnackbarComponent>,
              private notificationsService: NotificationsService) { }

  ngOnInit(): void {}

  getData() {
    this.pushData.latitude  = localStorage.getItem('p_lat');
    this.pushData.longitude = localStorage.getItem('p_lon');
    this.pushData.token     = localStorage.getItem('p_token');
  }

  showMap() {
    this.notificationsService.increaseHelped();
    this.notificationsService.sendNotificationToVictim(this.pushData.token);
    this.dismiss();
    console.log("Last but not least, we redirect to the map with the victim's location");
  } 
  
  onMyWayAction() {
    this.getData();
    this.showMap();
  }

  dismiss() {
    this.snackRef.dismiss();
  }

}
