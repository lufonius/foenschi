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
import {
  SetLoad, SetLoadAction, SetLoadFailure, SetLoadFailureAction,
  SetLoadSuccessAction
} from "../actions/base-loading.actions";
import {LanguageActionTypes, LoadAvailableLanguagesAction} from "../actions/language.actions";

@Injectable()
export class BaseLoadingEffects {

  constructor(public actions$: Actions) {}

  //when a load action is being received, it transforms it into another, generalized action
  //made this way because another module most likely has to load ressources aswell,
  //and the core module must not be dependent from other modules, so it just provides the
  //actions which can be used from them to tell the store that something is loading
  //and show the appropriate UI element
  @Effect()
  generalizeLoadAction$: Observable<Action> = this.actions$.pipe(
    ofType(NavigationActionTypes.LoadNavigation, LanguageActionTypes.LoadAvailableLanguages),
    map((loadAction: LoadNavigationAction | LoadAvailableLanguagesAction) =>
      new SetLoadAction(loadAction.request))
  );

  @Effect()
  generalizeLoadSuccessAction$: Observable<Action> = this.actions$.pipe(
    ofType(NavigationActionTypes.NavigationLoadSuccess, LanguageActionTypes.LoadAvailableLanguagesSuccess),
    map((loadSuccessAction: LoadNavigationAction | LoadAvailableLanguagesAction) =>
      new SetLoadSuccessAction(loadSuccessAction.request))
  );

  @Effect()
  generalizeLoadFailureAction$: Observable<Action> = this.actions$.pipe(
    ofType(NavigationActionTypes.NavigationLoadFailure, LanguageActionTypes.LoadAvailableLanguageFailure),
    map((loadFailureAction: LoadNavigationAction | LoadAvailableLanguagesAction) =>
      new SetLoadFailureAction(loadFailureAction.request))
  );
}
