import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { HttpResponse } from '@angular/common/http';
import { User } from '../../models/user.class';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    private route: Router,
    private response: HttpResponse<User>
  ) {
  }

  ngOnInit(): void {
    this.response.subscribe(loggedUser => this.response = loggedUser)
  }
  redirectToPrincipalView() {
    this.route.navigate(['']);
  }


}
