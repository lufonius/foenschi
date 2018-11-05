import { Injectable } from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import { ResumePageService } from "../services/resume-page.service";
import {
  ResumePageActions, ResumePageActionTypes, ResumePageLoadFailureAction,
  ResumePageLoadSuccessAction, LoadResumePageAction
} from "../actions/resume-page.actions";
import {flatMap} from "tslint/lib/utils";
import {State} from "../../core/reducers/index";
import {select, Store} from "@ngrx/store";
import {Observable, of, Subject} from "rxjs/index";
import * as fromRoot from '../../core/reducers/index';
import {catchError, combineLatest, filter, map, mergeMap} from "rxjs/operators";
import {SetLoadAction, SetLoadSuccessAction} from "../../core/actions/base-loading.actions";
import {ResumePage} from "../models/resume-page.view-model";


@Injectable()
export class ResumePageEffects {

  constructor(
    public actions$: Actions,
    public resumePageService: ResumePageService,
    public store: Store<State>) {

  }


  @Effect()
  getResumePageViewModel$ = this.actions$
    .pipe(
      ofType(ResumePageActionTypes.LoadResumePage),
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
        this.resumePageService.getResumePage(obj.currentLanguage).pipe(
          map((resumePage) => {
            return {
              action: <LoadResumePageAction>obj.action,
              resumePage: <ResumePage>resumePage
            }
          })
        )
      ),
      map(obj =>
        new ResumePageLoadSuccessAction({ resumePage: obj.resumePage }, obj.action.request.id)
      ),
      catchError((obj) => of(new ResumePageLoadFailureAction(obj.action.request.id)))
    );
}
