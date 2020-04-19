import { Component, OnInit } from '@angular/core';
import { PanicButtonService } from 'src/app/services/panic-button/panic-button.service'

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
   console.log("M'has clicat brooooooooooooo")
  }

}
