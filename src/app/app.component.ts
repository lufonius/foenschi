import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {MatButtonModule} from "@angular/material";

@Component({
  selector: 'lf-app',
  template: `
    <lf-layout></lf-layout>
  `
})
export class AppComponent implements OnInit {

  constructor(private store: Store<any>) { }

  ngOnInit() {
  }

}
