import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-terms-of-use',
  template: '<p> Pop up </p>'
  //templateUrl: './terms-of-use.component.html',
  //styleUrls: ['./terms-of-use.component.scss']
})
export class TermsOfUseComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<TermsOfUseComponent>) { }

  ngOnInit(): void {
    this.dialogRef.updatePosition({
      'top': '10%',
      'left': '10%'
    })
  }

  close(): void {
    this.dialogRef.close();
  }

} 
