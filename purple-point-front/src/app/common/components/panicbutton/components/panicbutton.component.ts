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
 
  sendAlert() {
   //this.panicButtonService.sendAlert()
   const userAlarm: PanicAlarm = {
    username: localStorage.getItem('username'),
    latitude: Number(localStorage.getItem('latitude')),
    longitude: Number(localStorage.getItem('longitude')),
    accuracy: Number(localStorage.getItem('accuracy')),
    timestamp: Number(localStorage.getItem('timestamp'))
   } 
   console.log("Estas enviant aixo", userAlarm)
   this.panicButtonService.sendAlert(userAlarm).subscribe((response: any) => {
    console.log(response)
   },
   errorrResponse => {
    //if (errorrResponse.status == 403 || errorrResponse.status == 404)
    console.log("Error al rebre resposta de l'alerta, aqui la teva response")
    console.log(errorrResponse)
    console.log("si encara no estas loguejat es normal(de moment)")

   });
   
  }

}
