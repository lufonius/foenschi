import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'lf-front-page',
  template: `
    <lf-entry></lf-entry>
    <lf-about-me></lf-about-me>
    <lf-project></lf-project>
    <lf-contact></lf-contact>
  `,
  styles: []
})
export class FrontPageComponent implements OnInit {

  constructor(private store: Store<any>) { }

  ngOnInit() {
  }

}
