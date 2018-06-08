import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {SetAboutMeSectionPositionAction} from "../../core/actions/layout.actions";

@Component({
  selector: 'lf-front-page',
  template: `
    <lf-entry></lf-entry>
    <lf-about-me (sectionPosition)="setSectionPosition($event)"></lf-about-me>
    <lf-project></lf-project>
    <lf-contact></lf-contact>
  `,
  styles: []
})
export class FrontPageComponent {

  constructor(private store: Store<any>) { }

  setSectionPosition(position: {x: number, y: number}) {
   this.store.dispatch(new SetAboutMeSectionPositionAction(position));
  }
}
