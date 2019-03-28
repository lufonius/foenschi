import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { FrontPageService } from '../services/front-page.service';
import {
  FrontPageActionTypes,
  FrontPageLoadFailureAction,
  FrontPageLoadSuccessAction,
  LoadFrontPageAction
} from '../actions/front-page.actions';
import * as fromRoot from '../../core/reducers/index';
import { State } from '../../core/reducers/index';
import { select, Store } from '@ngrx/store';
import { of } from 'rxjs/index';
import { catchError, combineLatest, filter, map, mergeMap } from 'rxjs/operators';

@Injectable()
export class FrontPageEffects {
  constructor(public actions$: Actions, public frontPageService: FrontPageService, public store: Store<State>) {
  }

  @Effect()
  getFrontPageViewModel$ = this.actions$.pipe(
    ofType(FrontPageActionTypes.LoadFrontPage),
    combineLatest(
      this.store.pipe(select(fromRoot.getCurrentLanguageState)).pipe(filter((currentLanguage) => !!currentLanguage)),
      (action, currentLanguage) => {
        return {
          action,
          currentLanguage
        };
      }
    ),
    mergeMap((obj) =>
      this.frontPageService.getFrontPage(obj.currentLanguage).pipe(
        map((frontPage) => {
          return {
            action: <LoadFrontPageAction>obj.action,
            frontPage
          };
        })
      )
    ),
    map((obj) => new FrontPageLoadSuccessAction({ frontPage: obj.frontPage }, obj.action.request.id)),
    catchError((obj) => of(new FrontPageLoadFailureAction(obj.action.request.id)))
  );
}
