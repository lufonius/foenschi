import { Injectable } from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import { FrontPageService } from "../services/front-page.service";
import {
  FrontPageActions, FrontPageActionTypes, FrontPageViewModelLoadFailureAction,
  FrontPageViewModelLoadSuccessAction
} from "../actions/front-page.actions";
import {flatMap} from "tslint/lib/utils";
import {State} from "../../reducers";
import {select, Store} from "@ngrx/store";
import {Observable, of} from "rxjs/index";
import * as fromPortfolio from '../reducers';
import {catchError, map, mergeMap} from "rxjs/internal/operators";


@Injectable()
export class FrontPageEffects {

  private currentLanguageState$: Observable<string>;

  constructor(
    private actions$: Actions,
    private frontPageService: FrontPageService,
    private store: Store<State>) {
    this.currentLanguageState$ = this.store.pipe(select(fromPortfolio.getCurrentLanguageState));
  }


  @Effect()
  getFrontPageViewModel$ = this.actions$
    .pipe(
      ofType(FrontPageActionTypes.LoadFrontPageViewModel),
      mergeMap(val => this.currentLanguageState$),
      mergeMap(currentLanguage => this.frontPageService.getFrontPageViewModel(currentLanguage)),
      map(frontPageViewModel => new FrontPageViewModelLoadSuccessAction({ frontPageViewModel })),
      catchError(error => of(new FrontPageViewModelLoadFailureAction({ error })))
    );
}
