import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ProjectService } from '../services/project.service';
import {
  LoadProjectDetailPageAction,
  ProjectDetailPageActionTypes,
  ProjectDetailPageLoadFailureAction,
  ProjectDetailPageLoadSuccessAction
} from '../actions/project-detail-page.actions';
import * as fromRoot from '../../core/reducers/index';
import { State } from '../../core/reducers/index';
import { select, Store } from '@ngrx/store';
import { of } from 'rxjs/index';
import { catchError, combineLatest, filter, map, mergeMap } from 'rxjs/operators';
import { ProjectDetailPage } from '../models/project-detail-page.view-model';

@Injectable()
export class ProjectDetailPageEffects {
  constructor(public actions$: Actions, public projectService: ProjectService, public store: Store<State>) {
  }

  @Effect()
  getProjectDetailPageViewModel$ = this.actions$.pipe(
    ofType(ProjectDetailPageActionTypes.LoadProjectDetailPage),
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
      this.projectService
        .getProjectDetailPage(obj.currentLanguage, (<LoadProjectDetailPageAction>obj.action).payload.projectId)
        .pipe(
          map((projectDetailPage: ProjectDetailPage) => {
            return {
              action: <LoadProjectDetailPageAction>obj.action,
              projectDetailPage: projectDetailPage
            };
          })
        )
    ),
    map(
      (obj) =>
        new ProjectDetailPageLoadSuccessAction({ projectDetailPage: obj.projectDetailPage }, obj.action.request.id)
    ),
    catchError((obj) => of(new ProjectDetailPageLoadFailureAction(obj.action.request.id)))
  );
}
