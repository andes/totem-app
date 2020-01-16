import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'error.html',
  styleUrls: [
    `error.scss`
  ],
  encapsulation: ViewEncapsulation.None,


})
export class ErrorComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  volver() {
    this.router.navigate(['buscar']);
  }

}
