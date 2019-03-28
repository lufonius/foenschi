import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { SkillsPageService } from '../services/skills-page.service';
import {
  LoadSkillsPageAction,
  SkillsPageActionTypes,
  SkillsPageLoadFailureAction,
  SkillsPageLoadSuccessAction
} from '../actions/skills.actions';
import * as fromRoot from '../../core/reducers/index';
import { State } from '../../core/reducers/index';
import { select, Store } from '@ngrx/store';
import { of } from 'rxjs/index';
import { catchError, combineLatest, filter, map, mergeMap } from 'rxjs/operators';

@Injectable()
export class SkillsPageEffects {
  constructor(public actions$: Actions, public skillsPageService: SkillsPageService, public store: Store<State>) {
  }

  @Effect()
  getSkillsPageViewModel$ = this.actions$.pipe(
    ofType(SkillsPageActionTypes.LoadSkillsPage),
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
      this.skillsPageService.getSkillsPage(obj.currentLanguage).pipe(
        map((skillsPage) => {
          return {
            action: <LoadSkillsPageAction>obj.action,
            skillsPage
          };
        })
      )
    ),
    map((obj) => new SkillsPageLoadSuccessAction({ skillsPage: obj.skillsPage }, obj.action.request.id)),
    catchError((obj) => of(new SkillsPageLoadFailureAction(obj.action.request.id)))
  );
}
