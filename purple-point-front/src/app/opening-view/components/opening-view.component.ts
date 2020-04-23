import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-opening-view',
  templateUrl: './opening-view.component.html',
  styleUrls: ['./opening-view.component.scss']
})
export class OpeningViewComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.router.navigate(['/principal']);
    }, 1500);
  }

}
