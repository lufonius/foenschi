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
  ProjectActionTypes,
  ProjectsLoadFailureAction,
  ProjectsLoadSuccessAction
} from "../actions/project.actions";
import {ProjectService} from "../services/project.service";
import {State} from "../../reducers";
import * as fromRoot from '../../reducers';
import {combineLatest, filter, mergeMap} from "rxjs/operators";
import {Subject} from "rxjs/index";

@Injectable()
export class ProjectEffects {

  constructor(
    private actions$: Actions,
    private projectService: ProjectService,
    private store: Store<State>
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
      (action, currentLanguage) => currentLanguage
    ),
    mergeMap(currentLanguage => this.projectService.getProjects(currentLanguage)),
    map(projects => new ProjectsLoadSuccessAction({ projects: projects })),
    catchError(() => of(new ProjectsLoadFailureAction()))
  );
}
