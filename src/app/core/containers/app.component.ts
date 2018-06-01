import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'lf-app',
  template: `
    app works!
  `,
  styles: []
})
export class AppComponent implements OnInit {

  constructor(private store: Store<any>) { }

  ngOnInit() {
  }

}
