import { Injectable } from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import { SkillsPageService } from "../services/skills-page.service";
import {
  SkillsPageActions, SkillsPageActionTypes, SkillsPageLoadFailureAction,
  SkillsPageLoadSuccessAction, LoadSkillsPageAction
} from "../actions/skills.actions";
import {flatMap} from "tslint/lib/utils";
import {State} from "../../core/reducers/index";
import {select, Store} from "@ngrx/store";
import {Observable, of, Subject} from "rxjs/index";
import * as fromRoot from '../../core/reducers/index';
import {catchError, combineLatest, filter, map, mergeMap} from "rxjs/internal/operators";
import {SetLoadAction, SetLoadSuccessAction} from "../../core/actions/base-loading.actions";


@Injectable()
export class SkillsPageEffects {

  constructor(
    private actions$: Actions,
    private skillsPageService: SkillsPageService,
    private store: Store<State>) {

  }


  @Effect()
  getSkillsPageViewModel$ = this.actions$
    .pipe(
      ofType(SkillsPageActionTypes.LoadSkillsPage),
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
        this.skillsPageService.getSkillsPage(obj.currentLanguage).pipe(
          map((skillsPage) => {
            return {
              action: <LoadSkillsPageAction>obj.action,
              skillsPage
            }
          })
        )
      ),
      map(obj =>
        new SkillsPageLoadSuccessAction({ skillsPage: obj.skillsPage }, obj.action.request.id)
      ),
      catchError((obj) => of(new SkillsPageLoadFailureAction(obj.action.request.id)))
    );
}
