import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {
  SetMediaQueryAction,
  SetNavigationBarHeightAction, SetNavigationVisibileAction,
  ToggleNavigationVisibilityAction
} from "../../actions/layout.actions";
import { State } from "../../../reducers";
import {merge, Observable, of, timer} from "rxjs/index";
import * as fromRoot from '../../../reducers';
import {  combineLatest, Subject } from 'rxjs';
import { flatMap, map, filter } from 'rxjs/operators';
import {MediaChange, ObservableMedia} from "@angular/flex-layout";
import {withLatestFrom} from "rxjs/internal/operators";
import {LoadNavigationAction, SetActiveNavigationViewModelAction} from "../../actions/navigation.actions";
import {NavigationViewModelAdapter} from "../../models/navigation-adapter.view-model";


const calcInterceptionPercentageFn = (navbarHeight: number, scrollYOffset: number, sectionYPosition: number) => {
  const difference = sectionYPosition - scrollYOffset;
  let percentage = 0;

  if(difference < navbarHeight || difference > 0) {
    percentage = 100 - ((difference * 100) / navbarHeight);
  }

  if(difference > navbarHeight) {
    percentage = 0;
  }

  if(difference < 0) {
    percentage = 100;
  }

  return percentage;
}

@Component({
  selector: 'lf-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LayoutComponent implements OnInit, AfterViewInit {

  private navigationVisibleState$: Observable<boolean>;
  private navigationItemsState$: Observable<NavigationViewModelAdapter[]>;
  private activeNavigationItemState$: Observable<NavigationViewModelAdapter>;
  private navigationBarHeightState$: Observable<number>;
  private aboutMeSectionPositionState$: Observable<{x: number, y: number}>;
  private isMobileMediaQueryState$: Observable<boolean>;
  private scrollYOffset$: Subject<number>;
  private navigationBarContentColor: string = "rgba(255, 255 ,255, 1)";


  constructor(
    private store: Store<State>,
    private mediaQuery$: ObservableMedia
  ) {
    this.navigationVisibleState$ = store.pipe(select(fromRoot.getNavigationVisibleState));
    this.navigationItemsState$ = store.pipe(select(fromRoot.getNavigationItemsState));
    this.activeNavigationItemState$ = store.pipe(select(fromRoot.getActiveNavigationItemState));
    this.navigationBarHeightState$ = store.pipe(select(fromRoot.getNavbarHeightState));
    this.aboutMeSectionPositionState$ = store.pipe(select(fromRoot.getAboutMeSectionPositionState));
    this.isMobileMediaQueryState$ = store.pipe(select(fromRoot.getIsMobileMediaQueryState));
    this.scrollYOffset$ = new Subject();

    mediaQuery$.subscribe((mediaQueryChange: MediaChange) => {
      let isXSMediaQueryActive: boolean = this.mediaQuery$.isActive('xs');
      let isSMMediaQueryActive: boolean = this.mediaQuery$.isActive('sm');

      this.store.dispatch(new SetMediaQueryAction(isXSMediaQueryActive || isSMMediaQueryActive));
    });

    const combined = combineLatest(
      this.navigationBarHeightState$,
      this.aboutMeSectionPositionState$,
      this.scrollYOffset$,
      (navbarHeight, aboutMeSectionPosition, scrollYOffset) => {
        return [navbarHeight, aboutMeSectionPosition.y, scrollYOffset];
      }
    );

    const mapFn = map(([navbarHeight, aboutMeSectionYPosition, scrollYOffset]) => {
      return calcInterceptionPercentageFn(navbarHeight, scrollYOffset, aboutMeSectionYPosition);
    });

    const interceptionPercentage$ = combined.pipe(
      mapFn,
      withLatestFrom(this.isMobileMediaQueryState$),
      filter((values) => values[1]),
      map((value) => value[0])
    );

    interceptionPercentage$.subscribe((interceptionPercentage) => {
      this.setNavbarContentColor(interceptionPercentage);
    });

    this.isMobileMediaQueryState$.subscribe((isMobileMediaQuery: boolean) => {
      if(!isMobileMediaQuery) {
        this.navigationBarContentColor = 'rgba(255, 255, 255, 1)';
      }
    });

    this.store.dispatch(new LoadNavigationAction());
  }

  @HostListener('window:scroll', ['$event']) onScroll() {
    this.scrollYOffset$.next(window.pageYOffset);
  }

  @ViewChild('navbar') navbar: ElementRef;

  ngOnInit() {

  }

  ngAfterViewInit() {
    let navbarHeight: number = this.navbar.nativeElement.offsetHeight;
    this.store.dispatch(new SetNavigationBarHeightAction(navbarHeight));
  }

  toggleNavVisibility() {
    this.store.dispatch(new ToggleNavigationVisibilityAction());
  }

  setNavbarContentColor(interceptionPercentage: number) {
    //TODO: refactor
    let rgbValue = 255 - (1.25 * interceptionPercentage);
    this.navigationBarContentColor = `rgba(${rgbValue}, ${rgbValue}, ${rgbValue}, 1)`;
  }

  activeNavigationItemChanged(item: NavigationViewModelAdapter) {
    this.store.dispatch(new SetActiveNavigationViewModelAction(item));
  }

  closeNavigation() {
    this.store.dispatch(new SetNavigationVisibileAction(false));
  }

}
