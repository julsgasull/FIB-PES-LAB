import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  //styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any,
              private snackRef: MatSnackBarRef<SnackbarComponent>) { }

  ngOnInit(): void {
  }

  onMyWayAction() {
    console.log("Clicked On My Way!");
    console.log(this.data.action);
  }

  cancel() {
    console.log("Clicked on cancel!");
    this.snackRef.dismiss();
  }

}
