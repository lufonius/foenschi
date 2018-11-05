import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/index";
import {select, Store} from "@ngrx/store";
import * as fromRoot from '../reducers';
import {map, tap, filter} from "rxjs/operators";

//checks if a current language is saved inside the store
//(before that there's a metareducer which checks if there is a chached current language state)
@Injectable()
export class CheckCurrentLanguageGuardService implements CanActivate {

  public currentLanguageState$: Observable<string>;

  constructor(public store: Store<fromRoot.State>, public router: Router) {
    this.currentLanguageState$ = store.pipe(select(fromRoot.getCurrentLanguageState));
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    //if this observable returns true, then it should get routed to the front page
    const obs = this.currentLanguageState$.pipe(
      tap(currentLanguage => {
        this.router.navigate([ `${currentLanguage}/portfolio/front` ])
      }),
      map(currentLanguage => !!currentLanguage)
    );

    return obs;
  }
}
