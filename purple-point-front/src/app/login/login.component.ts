import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.class';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  gender = ['male', 'famale', 'non-binary', 'other'];
  model = new User();
  submitted = false;
  
  onSubmit() { this.submitted = true; }

  constructor() { }

  ngOnInit(): void {
  }

}