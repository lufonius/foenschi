import { Injectable } from '@angular/core';
import {
  Actions,
  Effect,
  ofType
} from '@ngrx/effects';
import {Action, select, Store} from "@ngrx/store";
import {
  catchError,
  map
} from "rxjs/operators";
import {
  Observable,
  of
} from "rxjs";
import { Project } from "../models/project.view-model";
import {
  LoadProjectsAction,
  ProjectActionTypes,
  ProjectsLoadFailureAction,
  ProjectsLoadSuccessAction
} from "../actions/project.actions";
import {ProjectService} from "../services/project.service";
import {State} from "../../core/reducers/index";
import * as fromRoot from '../../core/reducers/index';
import {combineLatest, filter, mergeMap} from "rxjs/operators";
import {Subject} from "rxjs/index";
import {SetLoadAction} from "../../core/actions/base-loading.actions";

@Injectable()
export class ProjectEffects {

  constructor(
    public actions$: Actions,
    public projectService: ProjectService,
    public store: Store<State>
  ) {

  }

  //only get data when current language is set
  @Effect()
  getProjects: Observable<Action> = this.actions$.pipe(
    ofType(ProjectActionTypes.LoadProjects),
    combineLatest(
      //only emit if there is a 'real' value
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
      this.projectService.getProjects(obj.currentLanguage).pipe(
        map((projects) => {
            return {
              action: <LoadProjectsAction>obj.action,
              projects: <Project[]>projects
            }
          }
        )
      )
    ),
    map(obj => new ProjectsLoadSuccessAction({ projects: obj.projects }, obj.action.request.id)),
    catchError((obj) => of(new ProjectsLoadFailureAction(obj.action.request.id)))
  );
}
