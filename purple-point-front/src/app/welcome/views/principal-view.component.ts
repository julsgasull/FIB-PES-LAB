import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'principal-view',
  templateUrl: './principal-view.component.html',
  styleUrls: ['./principal-view.component.scss']
})
export class PrincipalViewComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  redirectToLogin() {
    this.route.navigate(['/login']);
  }
  redirectToSignUp() {
    this.route.navigate(['/signup']);
  }

}
