import { Injectable } from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action, select, Store} from "@ngrx/store";
import { Observable, of } from "rxjs";
import { map, catchError, filter,mergeMap, withLatestFrom } from 'rxjs/operators';
import { NavigationItem } from "../models/navigation-item.model";
import {
  NavigationActionTypes, NavigationLoadFailureAction,
  NavigationLoadSuccessAction
} from "../actions/navigation.actions";
import {State} from "../../reducers";
import * as fromRoot from '../../reducers';
import { NavigationService } from "../services/navigation.service";

@Injectable()
export class NavigationEffects {

  constructor(private actions$: Actions, private store: Store<State>, private navigationService: NavigationService) {}

  @Effect()
  getNavigation$: Observable<Action> = this.actions$.pipe(
    ofType(NavigationActionTypes.LoadNavigation),
    withLatestFrom(
      this.store.pipe(select(fromRoot.getCurrentLanguageState)).pipe(
        filter(language => !!language)
      ),
      (action, currentLanguage) => currentLanguage
    ),
    mergeMap(currentLanguage => this.navigationService.getNavigation(currentLanguage)),
    map(navigation => new NavigationLoadSuccessAction({ navigation })),
    catchError(() => of(new NavigationLoadFailureAction()))
  );
}
