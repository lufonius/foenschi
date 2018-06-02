import {
  Component,
  Input
} from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from "@angular/animations";

@Component({
  selector: 'lf-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  animations: [
    trigger('visibility', [
      state('visible', style({
        top: '0px'
      })),
      state('invisible', style({
        top: '-100vh'
      })),
      transition('visible => invisible', animate('250ms ease-in')),
      transition('invisible => visible', animate('250ms ease-out'))
    ])
  ]
})
export class NavigationComponent {
  private visibilityState: 'visible' | 'invisible' = 'invisible';
  private isVisible: boolean = false;

  @Input() set visible(isVisible: boolean) {

    console.log(isVisible);

    if(isVisible === true) {
      this.visibilityState = 'visible';
    } else if(isVisible === false) {
      this.visibilityState = 'invisible';
    }

    this.isVisible = isVisible;
  }
}
