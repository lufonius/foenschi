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
  SetMediaQueryAction,
  SetNavigationBarHeightAction,
  SetNavigationVisibileAction,
  ToggleNavigationVisibilityAction
} from "../../actions/layout.actions";
import { State } from "../../../reducers";
import {
  combineLatest,
  Observable
} from "rxjs/index";
import * as fromRoot from '../../../reducers';
import { Subject } from 'rxjs';
import {
  map,
  filter
} from 'rxjs/operators';
import {
  MediaChange,
  ObservableMedia
} from "@angular/flex-layout";
import { withLatestFrom } from "rxjs/operators";
import {
  LoadNavigationAction,
  SetActiveNavigationViewModelAction
} from "../../actions/navigation.actions";
import { NavigationItemAdapter } from "../../models/navigation-item-adapter.view-model";
import {NavigationService} from "../../services/navigation.service";
import {ScrollService} from "../../services/scroll.service";


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
export class LayoutComponent implements AfterViewInit {

  private navigationVisibleState$: Observable<boolean>;
  private navigationItemsState$: Observable<NavigationItemAdapter[]>;
  private navigationTitleState$: Observable<string>;
  private activeNavigationItemState$: Observable<NavigationItemAdapter>;
  private navigationBarHeightState$: Observable<number>;
  private aboutMeSectionPositionState$: Observable<{x: number, y: number}>;
  private isMobileMediaQueryState$: Observable<boolean>;
  private scrollYOffset$: Subject<number>;
  private navigationBarContentColor: string = "rgba(255, 255 ,255, 1)";


  constructor(
    private store: Store<State>,
    private mediaQuery$: ObservableMedia,
    private scrollService: ScrollService
  ) {
    this.navigationVisibleState$ = store.pipe(select(fromRoot.getNavigationVisibleState));
    this.navigationItemsState$ = store.pipe(select(fromRoot.getNavigationItemsState));
    this.navigationTitleState$ = store.pipe(select(fromRoot.getNavigationTitleState));
    this.activeNavigationItemState$ = store.pipe(select(fromRoot.getActiveNavigationItemState));
    this.navigationBarHeightState$ = store.pipe(select(fromRoot.getNavbarHeightState));
    this.aboutMeSectionPositionState$ = store.pipe(
      select(fromRoot.getSectionPositionsState),
      filter(sectionPosition => (!!sectionPosition) && (!!sectionPosition.aboutMeSectionPosition)),
      map(sectionPosition => sectionPosition.aboutMeSectionPosition)
    );
    this.isMobileMediaQueryState$ = store.pipe(select(fromRoot.getIsMobileMediaQueryState));
    this.scrollYOffset$ = new Subject();

    this.setIsMobileMediaQuery();
    this.setNavigationBarContentColor();
    this.setNavbarColorByInterception();

    this.store.dispatch(new LoadNavigationAction());
  }

  @HostListener('window:scroll', ['$event']) onScroll() {
    this.scrollYOffset$.next(window.pageYOffset);
  }

  @ViewChild('navbar') navbar: ElementRef;

  //TODO: Refactor -> putting parts of it into a directive
  setNavbarColorByInterception() {
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
  }

  setNavigationBarContentColor() {
    this.isMobileMediaQueryState$.pipe(
      filter(isMobileMediaQuery => !isMobileMediaQuery)
    ).subscribe(() => {
      this.navigationBarContentColor = 'rgba(255, 255, 255, 1)';
    });
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

  ngAfterViewInit() {
    let navbarHeight: number = this.navbar.nativeElement.offsetHeight;
    this.store.dispatch(new SetNavigationBarHeightAction({ height: navbarHeight }));
  }

  toggleNavVisibility() {
    this.store.dispatch(new ToggleNavigationVisibilityAction());
  }

  setNavbarContentColor(interceptionPercentage: number) {
    //TODO: refactor
    let rgbValue = 255 - (1.25 * interceptionPercentage);
    this.navigationBarContentColor = `rgba(${rgbValue}, ${rgbValue}, ${rgbValue}, 1)`;
  }

  activeNavigationItemChanged(item: NavigationItemAdapter) {
    this.store.dispatch(new SetActiveNavigationViewModelAction({ item }));
  }

  closeNavigation() {
    this.store.dispatch(new SetNavigationVisibileAction({ visible: false }));
  }

}
