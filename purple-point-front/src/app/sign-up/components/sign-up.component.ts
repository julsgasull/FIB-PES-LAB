import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  genders = ['Gender', 'Male', 'Female', 'Non binary', 'Ohter'];
  constructor() { }

  ngOnInit(): void {
  }

}
