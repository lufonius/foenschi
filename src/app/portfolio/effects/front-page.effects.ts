import { Injectable } from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import { FrontPageService } from "../services/front-page.service";
import {
  FrontPageActions, FrontPageActionTypes, FrontPageLoadFailureAction,
  FrontPageLoadSuccessAction, LoadFrontPageAction
} from "../actions/front-page.actions";
import {flatMap} from "tslint/lib/utils";
import {State} from "../../core/reducers/index";
import {select, Store} from "@ngrx/store";
import {Observable, of, Subject} from "rxjs/index";
import * as fromRoot from '../../core/reducers/index';
import {catchError, combineLatest, filter, map, mergeMap} from "rxjs/internal/operators";
import {SetLoadAction, SetLoadSuccessAction} from "../../core/actions/base-loading.actions";


@Injectable()
export class FrontPageEffects {

  constructor(
    private actions$: Actions,
    private frontPageService: FrontPageService,
    private store: Store<State>) {

  }


  @Effect()
  getFrontPageViewModel$ = this.actions$
    .pipe(
      ofType(FrontPageActionTypes.LoadFrontPage),
      combineLatest(
        this.store.pipe(select(fromRoot.getCurrentLanguageState)).pipe(
          filter(currentLanguage => !!currentLanguage)
        ),
        (action, currentLanguage) => {
          return {
            action,
            currentLanguage
          }
        }
      ),
      mergeMap(obj =>
        this.frontPageService.getFrontPage(obj.currentLanguage).pipe(
          map((frontPage) => {
            return {
              action: <LoadFrontPageAction>obj.action,
              frontPage
            }
          })
        )
      ),
      map(obj =>
        new FrontPageLoadSuccessAction({ frontPage: obj.frontPage }, obj.action.request.id)
      ),
      catchError((obj) => of(new FrontPageLoadFailureAction(obj.action.request.id)))
    );
}
