import {
  Component, EventEmitter,
  Input, Output, ViewEncapsulation
} from '@angular/core';
import {
  animate, animateChild, keyframes, query,
  state,
  style,
  transition,
  trigger
} from "@angular/animations";
import { NavigationItemAdapter } from "../../models/navigation-item-adapter.view-model";

const EASE_IN_OUT_CIRC = 'cubic-bezier(0.075, 0.82, 0.165, 1)';
const EASE_IN_OUT_BACK = "cubic-bezier(0.68, -0.55, 0.265, 1.55)";



@Component({
  selector: 'lf-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('visibility', [
      state('visible', style({
        top: '0px',
        bottom: '0px',
        width: '100%',
        left: '0%',
        'border-bottom-left-radius': '0%'
      })),
      state('invisible', style({
        top: '-100vh',
        bottom: 'unset',
        width: '0%',
        left: '100%',
        'border-bottom-left-radius': '50%'
      })),
      transition('visible => invisible', [
        query('@closeVisibility', [
          animateChild()
        ]),
        animate(`200ms ${EASE_IN_OUT_CIRC}`),
      ]),
      transition('invisible => visible', [
        animate(`200ms ${EASE_IN_OUT_CIRC}`),
        query('@closeVisibility', [
          animateChild()
        ])
      ])
    ]),
    trigger('navigationLevels', [
      state('first', style({
        transform: 'translateX(0%)'
      })),
      state('second', style({
        transform: 'translateX(-100%)'
      })),
      transition('first => second', animate(`250ms ${EASE_IN_OUT_CIRC}`)),
      transition('second => first', animate(`200ms ${EASE_IN_OUT_CIRC}`))
    ]),
    trigger('closeVisibility', [
      state('visible', style({
        transform: 'rotate(0deg) scale(1)',
        opacity: 1
      })),
      state('invisible', style({
        transform: 'rotate(45deg) scale(0.75)',
        opacity: 0
      })),
      transition('visible => invisible', animate(`200ms ${EASE_IN_OUT_BACK}`)),
      transition('invisible => visible', animate(`200ms ${EASE_IN_OUT_BACK}`))
    ])
  ]
})
export class NavigationComponent {
  private visibilityState: 'visible' | 'invisible' = 'invisible';
  private isVisible: boolean = false;

  private currentNavigationLevel: 'first' | 'second' = 'first';

  private activeNavigationItemId: string = null;

  private navigationHeaderTitle: string = "";

  @Input() currentLanguage: string = null;

  @Input() set visible(isVisible: boolean) {
    if(isVisible === true) {
      this.visibilityState = 'visible';
    } else if(isVisible === false) {
      this.visibilityState = 'invisible';
    }

    this.isVisible = isVisible;
  }

  get visible(): boolean {
    return this.isVisible;
  }

  @Input() navigationItems: NavigationItemAdapter[] = [];

  @Input() set activeNavigationItem(navigationItem: NavigationItemAdapter) {

    if(navigationItem) {
      this.activeNavigationItemId = navigationItem.id;
    } else {
      this.activeNavigationItemId = null;
    }
    //animate back when there is no selected nav-item
    if(this.isMobileMediaQuery) {

      if(navigationItem) {
        this.currentNavigationLevel = 'second';
        this.navigationHeaderTitle = navigationItem.title;
      } else {
        this.currentNavigationLevel = 'first';
        this.navigationHeaderTitle = "";
      }
    }
  }

  @Input() isMobileMediaQuery: boolean = false;

  @Input() title: string = "";

  @Output() activeNavigationItemChanged: EventEmitter<NavigationItemAdapter>
    = new EventEmitter<NavigationItemAdapter>();

  @Output() routeChanged: EventEmitter<{route: string, currentLanguage: string}>
    = new EventEmitter<{route: string, currentLanguage: string}>();

  @Output() navigationClosed: EventEmitter<void> = new EventEmitter<void>();

  back() {
    this.resetActiveNavigationItem();
  }

  resetActiveNavigationItem() {
    this.activeNavigationItemChanged.emit(null);
  }

  activeNavigationItemChange(item: NavigationItemAdapter) {
    if(!item.hasChildren) {
      this.navigationClosed.emit();
      this.routeChange(item.route);
      this.resetActiveNavigationItem();
    } else {
      this.activeNavigationItemChanged.emit(item);
    }
  }

  routeChange(route: string) {
    this.routeChanged.emit({ route: route, currentLanguage: this.currentLanguage });
  }

  closeNavigation() {
    this.navigationClosed.emit();
  }
}
