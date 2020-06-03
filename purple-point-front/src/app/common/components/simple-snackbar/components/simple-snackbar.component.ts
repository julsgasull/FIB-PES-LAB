import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { SnackbarComponent } from './.././../snackbar/components/snackbar.component';
import { NotificationsService } from 'src/app/services/notifications/notifications.service';

@Component({
  selector: 'app-simple-snackbar',
  templateUrl: './simple-snackbar.component.html',
  //styleUrls: ['./simple-snackbar.component.scss']
})
export class SimpleSnackbarComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any,
  private snackRef: MatSnackBarRef<SnackbarComponent>,
  private notificationsService: NotificationsService) { }

  ngOnInit(): void {}

  

}
