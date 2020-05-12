import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { pushData } from 'src/app/models/pushdata.interface';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  //styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit {

  pushData: pushData = {latitude: "", longitude: "", token: ""};

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any,
              private snackRef: MatSnackBarRef<SnackbarComponent>) { }

  ngOnInit(): void {
  }

  getData() {
    this.pushData.latitude  = localStorage.getItem('p_lat');
    this.pushData.longitude = localStorage.getItem('p_lon');
    this.pushData.token     = localStorage.getItem('p_token');
  }
  
  incrementHelped() {
    console.log("Incremented!");
  }

  sendNotif() {
    console.log("Sent!");
  }

  showMap() {
    console.log("Here we treat the notification's action");
    console.log("First we increment the user's helped value for the helper");
    this.incrementHelped();
    console.log("Then we send a notification to the victim");
    this.sendNotif();
    this.dismiss();
    console.log("Last but not least, we redirect to the map with the victim's location");
  } 
  
  onMyWayAction() {
    this.getData();
    console.log("Clicked On My Way!");
    console.log(this.pushData);
    
    this.showMap();
  }

  dismiss() {
    console.log("Clicked on cancel!");
    this.snackRef.dismiss();
  }

}
