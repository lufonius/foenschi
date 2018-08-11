import { Injectable } from '@angular/core';
import {Actions, Effect, ofType, ROOT_EFFECTS_INIT} from '@ngrx/effects';
import * as fromRoot from "../reducers";
import {catchError, filter, map, mergeMap, withLatestFrom} from "rxjs/operators";
import {Action, INIT, select} from "@ngrx/store";
import {Observable, of} from "rxjs/index";
import {
  LanguageActionTypes, LoadAvailableLanguagesAction, LoadAvailableLanguagesFailureAction,
  LoadAvailableLanguagesSuccessAction
} from "../actions/language.actions";
import {LanguagesService} from "../services/languages.service";


@Injectable()
export class LanguageEffects {

  constructor(private actions$: Actions, private languagesService: LanguagesService) {}

  @Effect()
  getAvailableLanguages$: Observable<Action> = this.actions$.pipe(
    ofType(LanguageActionTypes.loadAvailableLanguages),
    mergeMap(() => this.languagesService.getAvailableLanguages()),
    map(availableLanguages => new LoadAvailableLanguagesSuccessAction( { availableLanguages })),
    catchError(() => of(new LoadAvailableLanguagesFailureAction()))
  );

  //made this way because its better for debugging
  @Effect()
  getAvailableLanguagesOnInit$: Observable<Action> = this.actions$.pipe(
    ofType(ROOT_EFFECTS_INIT),
    map(() => new LoadAvailableLanguagesAction())
  );
}
