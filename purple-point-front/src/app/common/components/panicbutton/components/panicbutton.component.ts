import { Component, OnInit } from '@angular/core';
import { PanicButtonService } from 'src/app/services/panic-button/panic-button.service'
import { PanicAlarm } from 'src/app/models/panicAlarm.interface';

@Component({
  selector: 'panicbutton',
  templateUrl: './panicbutton.component.html',
  styleUrls: ['./panicbutton.component.scss']
})
export class PanicbuttonComponent implements OnInit {

  constructor(
    private panicButtonService: PanicButtonService,
  ) { }

  ngOnInit(): void {
  }

  disableLogin() {
    const token = localStorage.getItem('token');
    if (token !== "null") localStorage.setItem('disableLogin', "notNull"); // logged user
    else localStorage.setItem('disableLogin', null); // unlogged user
  }
 
  sendAlert() {
    const userAlarm: PanicAlarm = {
      username: localStorage.getItem('username'),
      latitude: Number(localStorage.getItem('latitude')),
      longitude: Number(localStorage.getItem('longitude')),
      accuracy: Number(localStorage.getItem('accuracy')),
      timestamp: Number(localStorage.getItem('timestamp')),
      panicbutton: true,
   } 

   this.disableLogin();
   this.panicButtonService.sendAlert(userAlarm).subscribe((response) => {
      localStorage.setItem('disableLogin', "notNull");
   },
   (error) => { console.log("ERROR: ", error); });
  }

}
