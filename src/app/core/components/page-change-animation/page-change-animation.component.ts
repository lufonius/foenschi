import { Component, OnInit } from '@angular/core';
import { animate, group, query, style, transition, trigger } from '@angular/animations';

const EASE_IN_OUT_CIRC = 'cubic-bezier(0.075, 0.82, 0.165, 1)';
const EASE_IN_OUT_BACK = 'cubic-bezier(0.68, -0.55, 0.265, 1.55)';

@Component({
  selector: 'lf-page-change-animation',
  templateUrl: './page-change-animation.component.html',
  styleUrls: ['./page-change-animation.component.scss'],
  animations: [
    trigger('visibility', [
      transition('visible => invisible', []),
      transition('invisible => visible', [
        query('#lf-circle-0', style({ borderWidth: '3vw' })),
        query('#lf-circle-1', style({ borderWidth: '3vw' })),
        query('#lf-circle-2', style({ borderWidth: '3vw' })),
        query('#lf-circle-3', style({ borderWidth: '3vw' })),
        query('#lf-circle-4', style({ borderWidth: '3vw' })),
        query('#lf-circle-5', style({ borderWidth: '3vw' })),
        query('#lf-circle-6', style({ borderWidth: '3vw' })),
        query('#lf-circle-7', style({ borderWidth: '3vw' })),
        query('#lf-circle-8', style({ borderWidth: '3vw' })),
        query('#lf-circle-9', style({ borderWidth: '3vw' })),

        group([
          query('#lf-circle-0', animate(`200ms ${EASE_IN_OUT_CIRC}`, style({ transform: 'translateZ(100)' }))),
          query('#lf-circle-1', animate(`200ms 10ms ${EASE_IN_OUT_CIRC}`, style({ transform: 'translateZ(100)' }))),
          query('#lf-circle-2', animate(`200ms 20ms ${EASE_IN_OUT_CIRC}`, style({ transform: 'translateZ(100)' }))),
          query('#lf-circle-3', animate(`200ms 30ms ${EASE_IN_OUT_CIRC}`, style({ transform: 'translateZ(100)' }))),
          query('#lf-circle-4', animate(`200ms 40ms ${EASE_IN_OUT_CIRC}`, style({ transform: 'translateZ(100)' }))),
          query('#lf-circle-5', animate(`200ms 50ms ${EASE_IN_OUT_CIRC}`, style({ transform: 'translateZ(100)' }))),
          query('#lf-circle-6', animate(`200ms 60ms ${EASE_IN_OUT_CIRC}`, style({ transform: 'translateZ(100)' }))),
          query('#lf-circle-7', animate(`200ms 70ms ${EASE_IN_OUT_CIRC}`, style({ transform: 'translateZ(100)' }))),
          query('#lf-circle-8', animate(`200ms 80ms ${EASE_IN_OUT_CIRC}`, style({ transform: 'translateZ(100)' }))),
          query('#lf-circle-9', animate(`200ms 90ms ${EASE_IN_OUT_CIRC}`, style({ transform: 'translateZ(100)' })))
        ])
        /*query('#lf-circle-1', style({ width: '10vw', height: '10vw' })),
        query('#lf-circle-0', style({ width: '10vw', height: '10vw' })),*/
        /*group([
          query('#lf-circle-0' ,animate(`2s ${EASE_IN_OUT_CIRC}`, style({ transform: 'scale(20)' }))),
          query('#lf-circle-1', animate(`2s ${EASE_IN_OUT_CIRC}`, style({ transform: 'scale(20)' }))),
        ])*/
      ])
    ])
  ]
})
export class PageChangeAnimationComponent implements OnInit {
  public visible: string = 'invisible';

  constructor() {
  }

  ngOnInit() {
  }
}
