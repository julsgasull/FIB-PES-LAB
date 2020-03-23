import { Component, OnInit } from '@angular/core';
import { User }               from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  gender = ['male', 'famale', 'non-binary', 'other'];
  model = new User('test@mail.com', 'testUsername', 'Passw0rd!', this.gender[2]);
  submitted = false;
  
  onSubmit() { this.submitted = true; }

  constructor() { }

  ngOnInit(): void {
  }

}
