import { Injectable } from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action, select, Store} from "@ngrx/store";
import { Observable, of } from "rxjs";
import { map, catchError, filter,mergeMap, withLatestFrom } from 'rxjs/operators';
import { NavigationItem } from "../models/navigation-item.model";
import {
  LoadNavigationAction,
  NavigationActionTypes,
  NavigationLoadFailureAction,
  NavigationLoadSuccessAction
} from "../actions/navigation.actions";
import {State} from "../reducers/index";
import * as fromRoot from '../reducers/index';
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
      (action, currentLanguage) => {
        return { action, currentLanguage }
      }
    ),
    mergeMap(obj => {
       return this.navigationService.getNavigation(obj.currentLanguage).pipe(
         map(navigation => {
           return {
             requestId: (<LoadNavigationAction>obj.action).request.id,
             navigation
           }
         })
       )
    }),
    map(obj =>
      new NavigationLoadSuccessAction({ navigation: obj.navigation }, obj.requestId)
    ),
    catchError((obj) =>
      of(new NavigationLoadFailureAction(obj.requestId))
    )
  );
}
