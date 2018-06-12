import {
  Component, EventEmitter,
  Input, Output, ViewEncapsulation
} from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from "@angular/animations";
import {NavigationViewModelAdapter} from "../../models/navigation-adapter.view-model";

@Component({
  selector: 'lf-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  encapsulation: ViewEncapsulation.None,
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
    ]),
    trigger('navigationLevels', [
      state('first', style({
        transform: 'translateX(0%)'
      })),
      state('second', style({
        transform: 'translateX(-100%)'
      })),
      transition('first => second', animate('250ms ease-in')),
      transition('second => first', animate('250ms ease-out'))
    ])
  ]
})
export class NavigationComponent {
  private visibilityState: 'visible' | 'invisible' = 'invisible';
  private isVisible: boolean = false;

  private currentNavigationLevel: 'first' | 'second' = 'first';

  private activeNavigationItemId: string = null;

  @Input() set visible(isVisible: boolean) {
    if(isVisible === true) {
      this.visibilityState = 'visible';
    } else if(isVisible === false) {
      this.visibilityState = 'invisible';
    }

    this.isVisible = isVisible;
  }

  @Input() navigationItems: NavigationViewModelAdapter[] = [];

  @Input() set activeNavigationItem(navigationItem: NavigationViewModelAdapter) {

    if(navigationItem) {
      this.activeNavigationItemId = navigationItem.id;
    } else {
      this.activeNavigationItemId = null;
    }
    //animate back when there is no selected nav-item
    if(this.isMobileMediaQuery) {
      if(navigationItem) {
        this.currentNavigationLevel = 'second';
      } else {
        this.currentNavigationLevel = 'first';
      }
    }
  }

  @Input() isMobileMediaQuery: boolean = false;

  @Output() activeNavigationItemChanged: EventEmitter<NavigationViewModelAdapter>
    = new EventEmitter<NavigationViewModelAdapter>();

  @Output() routeChanged: EventEmitter<string> = new EventEmitter<string>();

  back() {
    this.resetActiveNavigationItem();
  }

  resetActiveNavigationItem() {
    this.activeNavigationItemChanged.emit(null);
  }

  activeNavigationItemChange(item: NavigationViewModelAdapter) {
    if(!item.hasChildren) {
      this.routeChange(item.route);
      this.resetActiveNavigationItem();
    } else {
      this.activeNavigationItemChanged.emit(item);
    }
  }

  routeChange(route: string) {
    this.routeChanged.emit(route);
  }
}
