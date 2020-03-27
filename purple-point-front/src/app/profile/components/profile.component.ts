import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    private route: Router
  ) {
  }

  ngOnInit(): void {
  }
  redirectToPrincipalView() {
    this.route.navigate(['']);
  }

}
