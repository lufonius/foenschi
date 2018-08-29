import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {
  select,
  Store
} from "@ngrx/store";
import {
  SetCurrentPageScrollYOffsetAction,
  SetMediaQueryAction,
  SetNavigationBarHeightAction,
  SetNavigationVisibileAction,
  ToggleNavigationVisibilityAction
} from "../../actions/layout.actions";
import { State } from "../../reducers/index";
import {
  combineLatest,
  Observable
} from "rxjs/index";
import * as fromRoot from '../../reducers/index';
import { Subject } from 'rxjs';
import {
  map,
  filter,
  tap
} from 'rxjs/operators';
import {
  MediaChange,
  ObservableMedia
} from "@angular/flex-layout";
import { last } from "rxjs/operators";
import {
  LoadNavigationAction,
  SetActiveNavigationViewModelAction
} from "../../actions/navigation.actions";
import { NavigationItemAdapter } from "../../models/navigation-item-adapter.view-model";
import {NavigationService} from "../../services/navigation.service";
import {ScrollService} from "../../services/scroll.service";
import {Router} from "@angular/router";

@Component({
  selector: 'lf-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LayoutComponent {

  private navigationVisibleState$: Observable<boolean>;
  private navigationItemsState$: Observable<NavigationItemAdapter[]>;
  private navigationTitleState$: Observable<string>;
  private activeNavigationItemState$: Observable<NavigationItemAdapter>;
  private aboutMeSectionPositionState$: Observable<{x: number, y: number}>;
  private isMobileMediaQueryState$: Observable<boolean>;
  private scrollYOffset$: Subject<number>;
  private currentPageScrollYOffset$: Observable<number>;
  private currentLanguageState$: Observable<string>;
  private isSomethingLoading$: Observable<boolean>;


  constructor(
    private store: Store<State>,
    private mediaQuery$: ObservableMedia,
    private scrollService: ScrollService,
    private router: Router
  ) {
    this.navigationVisibleState$ = store.pipe(select(fromRoot.getNavigationVisibleState));
    this.navigationItemsState$ = store.pipe(select(fromRoot.getNavigationItemsState));
    this.navigationTitleState$ = store.pipe(select(fromRoot.getNavigationTitleState));
    this.activeNavigationItemState$ = store.pipe(select(fromRoot.getActiveNavigationItemState));
    this.currentPageScrollYOffset$ = store.pipe(select(fromRoot.getCurrentPageScrollYOffsetState));
    this.aboutMeSectionPositionState$ = store.pipe(
      select(fromRoot.getSectionPositionsState),
      filter(sectionPosition => (!!sectionPosition) && (!!sectionPosition.aboutMeSectionPosition)),
      map(sectionPosition => sectionPosition.aboutMeSectionPosition)
    );
    this.isMobileMediaQueryState$ = store.pipe(select(fromRoot.getIsMobileMediaQueryState));
    this.currentLanguageState$ = store.pipe(select(fromRoot.getCurrentLanguageState));
    this.isSomethingLoading$ = store.pipe(select(fromRoot.getIsSomethingLoading));
    this.scrollYOffset$ = new Subject();

    this.setIsMobileMediaQuery();

    this.store.dispatch(new LoadNavigationAction());
  }

  @HostListener('window:scroll', ['$event']) onScroll() {
    this.scrollYOffset$.next(window.pageYOffset);
  }

  setIsMobileMediaQuery() {
    this.mediaQuery$.subscribe((mediaQueryChange: MediaChange) => {
      let isXSMediaQueryActive: boolean = this.mediaQuery$.isActive('xs');
      let isSMMediaQueryActive: boolean = this.mediaQuery$.isActive('sm');

      this.store.dispatch(
        new SetMediaQueryAction({
          isMobileMediaQuery: isXSMediaQueryActive || isSMMediaQueryActive
        })
      );
    });
  }

  toggleNavVisibility() {
    this.store.dispatch(new ToggleNavigationVisibilityAction());
  }

  activeNavigationItemChanged(item: NavigationItemAdapter) {
    this.store.dispatch(new SetActiveNavigationViewModelAction({ item }));
  }

  closeNavigation() {
    this.store.dispatch(new SetNavigationVisibileAction({ visible: false }));
  }

  routeChange(routeParts: { route: string, currentLanguage: string }) {
    if(routeParts.route) {
      this.router.navigate([`${routeParts.currentLanguage}/${routeParts.route}`]);
    }
  }
}
