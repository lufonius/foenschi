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
  SetCurrentFrontPageSectionAction,
  SetCurrentPageScrollYOffsetAction,
  SetMediaQueryAction,
  SetNavigationBarHeightAction, SetNavigationTransformOriginAction,
  SetNavigationVisibileAction,
  ToggleNavigationVisibilityAction
} from "../../actions/layout.actions";
import { State } from "../../reducers/index";
import {
  BehaviorSubject,
  combineLatest, merge,
  Observable, of
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
  MediaObserver
} from "@angular/flex-layout";
import {
  LoadNavigationAction,
  SetActiveNavigationViewModelAction
} from "../../actions/navigation.actions";
import { NavigationItemAdapter } from "../../models/navigation-item-adapter.view-model";
import {ScrollService} from "../../services/scroll.service";
import {ActivatedRoute, ActivationEnd, Router} from "@angular/router";
import {Language} from "../../models/language.model";

@Component({
  selector: 'lf-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LayoutComponent {

  public navigationVisibleState$: Observable<boolean>;
  public navigationItemsState$: Observable<NavigationItemAdapter[]>;
  public navigationTitleState$: Observable<string>;
  public activeNavigationItemState$: Observable<NavigationItemAdapter>;
  public aboutMeSectionPositionState$: Observable<{x: number, y: number}>;
  public isMobileMediaQueryState$: Observable<boolean>;
  public scrollYOffset$: Subject<number>;
  public currentPageScrollYOffset$: Observable<number>;
  public currentLanguageState$: Observable<string>;
  public availableLanguagesState$: Observable<Language[]>;
  public isSomethingLoading$: Observable<boolean>;
  public navbarType$: BehaviorSubject<string>;
  public showQuickNav$: BehaviorSubject<boolean>;
  public quickNavTitlesState$: Observable<{aboutme: string, contact: string, projects: string, entry: string}>;

  public navigationTransformOriginState$: Observable<{ x:number, y: number }>;

  constructor(
    public store: Store<State>,
    public mediaQuery$: MediaObserver,
    public scrollService: ScrollService,
    public router: Router
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
    this.quickNavTitlesState$ = store.pipe(select(fromRoot.getQuickNavTitles));
    this.scrollYOffset$ = new Subject();
    this.navigationTransformOriginState$ = store.pipe(select(fromRoot.getNavigationTransformOriginState));
    this.availableLanguagesState$ = store.pipe(select(fromRoot.getAvailableLanguagesState));

    this.setIsMobileMediaQuery();
    this.loadNavigation();

    this.navbarType$ = new BehaviorSubject<string>(null);
    this.showQuickNav$ = new BehaviorSubject<boolean>(false);

    this.router.events.pipe(
      filter(event => event instanceof ActivationEnd && event.snapshot.children.length == 0),
      map((event: ActivationEnd) => {
        let navbarType = (event.snapshot.data['navbarType']) ? event.snapshot.data['navbarType'] : 'normal';
        let showQuickNav = (event.snapshot.data['showQuickNav']) ? event.snapshot.data['showQuickNav'] : false;

        return { navbarType, showQuickNav };
      })
    ).subscribe(navbarSettings => {
      this.navbarType$.next(navbarSettings.navbarType);
      this.showQuickNav$.next(navbarSettings.showQuickNav);
    });
  }

  @HostListener('window:scroll', ['$event']) onScroll() {
    this.scrollYOffset$.next(window.pageYOffset);
  }

  loadNavigation() {
    this.store.dispatch(new LoadNavigationAction());
  }

  setIsMobileMediaQuery() {
    this.mediaQuery$.asObservable().subscribe(() => {
      let isXSMediaQueryActive: boolean = this.mediaQuery$.isActive('xs');
      let isSMMediaQueryActive: boolean = this.mediaQuery$.isActive('sm');

      this.store.dispatch(
        new SetMediaQueryAction({
          isMobileMediaQuery: isXSMediaQueryActive || isSMMediaQueryActive
        })
      );
    });
  }

  toggleNavVisibility(event) {
    this.store.dispatch(new SetNavigationTransformOriginAction({ transformOrigin: {
        x: event.clientX,
        y: event.clientY
      }}));
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

  goToSection(section: 'about-me' | 'contact' | 'entry' | 'projects') {
    this.store.dispatch(new SetCurrentFrontPageSectionAction({ currentFrontPageSection: section }));
  }

  navigateToChooseLanguage() {
    this.closeNavigation();
    this.router.navigate(['/choose-language']);
  }


}
