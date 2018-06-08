import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {
  SetMediaQueryAction,
  SetNavbarHeightAction,
  ToggleNavVisibilityAction
} from "../../actions/layout.actions";
import { State } from "../../../reducers";
import {Observable, timer} from "rxjs/index";
import * as fromRoot from '../../../reducers';
import {  combineLatest, Subject } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import {MediaChange, ObservableMedia} from "@angular/flex-layout";


const calcPercentageFn = (navbarHeight: number, scrollYOffset: number, sectionYPosition: number) => {
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

  private navVisibilityState$: Observable<boolean>;
  private navbarHeightState$: Observable<number>;
  private aboutMeSectionPositionState$: Observable<{x: number, y: number}>;
  private isMobileMediaQueryState$: Observable<boolean>;
  private scrollYOffset$: Subject<number>;
  private navbarContentColor: string = "rgba(255,255,255,1)";


  constructor(
    private store: Store<State>,
    private mediaQuery$: ObservableMedia
  ) {
    this.navVisibilityState$ = store.pipe(select(fromRoot.getNavVisibilityState));
    this.navbarHeightState$ = store.pipe(select(fromRoot.getNavbarHeightState));
    this.aboutMeSectionPositionState$ = store.pipe(select(fromRoot.getAboutMeSectionPositionState));
    this.isMobileMediaQueryState$ = store.pipe(select(fromRoot.getIsMobileMediaQueryState));
    this.scrollYOffset$ = new Subject();

    mediaQuery$.subscribe((mediaQueryChange: MediaChange) => {
      let isXSMediaQueryActive: boolean = this.mediaQuery$.isActive('xs');
      let isSMMediaQueryActive: boolean = this.mediaQuery$.isActive('sm');

      this.store.dispatch(new SetMediaQueryAction(isXSMediaQueryActive || isSMMediaQueryActive));
    });

    this.isMobileMediaQueryState$.pipe(
      filter((isMobileMediaQuery: boolean) => isMobileMediaQuery)
    ).subscribe(() => {
      // giving these values to a stream, makes handling easier
      // when both values are present, doing the calculations
      const combined = combineLatest(
        this.navbarHeightState$,
        this.aboutMeSectionPositionState$,
        this.scrollYOffset$,
        (navbarHeight, aboutMeSectionPosition, scrollYOffset) => {
          return [navbarHeight, aboutMeSectionPosition.y, scrollYOffset];
        }
      );

      const mapFn = map(([navbarHeight, aboutMeSectionYPosition, scrollYOffset]) => {
        return calcPercentageFn(navbarHeight, scrollYOffset, aboutMeSectionYPosition);
      });

      combined.pipe(mapFn).subscribe((percentage) => {
        this.setNavbarContentColor(percentage);
      });
    })
  }

  /*
  * Get scoll position here.
  * Get difference to about-me-section position.
  * if difference within the range of the navbar (eg. diff is 67, navbar height is 100 -> change color till 67%)
  * Not recording scroll position in store as it makes the application slow and animations flickering
  * */

  @HostListener('window:scroll', ['$event']) onScroll() {
    this.scrollYOffset$.next(window.pageYOffset);
  }

  @ViewChild('navbar') navbar: ElementRef;

  ngOnInit() {

  }

  ngAfterViewInit() {
    let navbarHeight: number = this.navbar.nativeElement.offsetHeight;
    this.store.dispatch(new SetNavbarHeightAction(navbarHeight));
  }

  toggleNavVisibility() {
    this.store.dispatch(new ToggleNavVisibilityAction());
  }

  setNavbarContentColor(percentage: number) {
    let rgbValue = 255 - (1.25 * percentage);
    this.navbarContentColor = `rgba(${rgbValue}, ${rgbValue}, ${rgbValue}, 1)`;
  }

}
