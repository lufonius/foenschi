import { Injectable } from '@angular/core';
import {
  Actions,
  Effect,
  ofType
} from '@ngrx/effects';
import { Action } from "@ngrx/store";
import {
  catchError,
  map
} from "rxjs/operators";
import {
  Observable,
  of
} from "rxjs";
import { Project } from "../models/project.model";
import {
  ProjectActionTypes,
  ProjectsLoadFailureAction,
  ProjectsLoadSuccessAction
} from "../actions/project.actions";


const PROJECTS_MODEL: Project[] = [
  {
    id: '1',
    title: 'AppExplorer',
    secondaryDescription: 'this is a secondary description',
    primaryDescription: 'this is a primary description'
  },
  {
    id: '2',
    title: 'Stundensaldo',
    secondaryDescription: 'this is a secondary description',
    primaryDescription: 'this is a primary description'
  },
  {
    id: '3',
    title: 'This website',
    secondaryDescription: 'this is a secondary description',
    primaryDescription: 'this is a primary description'
  }
];

@Injectable()
export class ProjectEffects {

  constructor(private actions$: Actions) {}

  @Effect()
  getProjects: Observable<Action> = this.actions$.pipe(
    ofType(ProjectActionTypes.LoadProjects),
    map(projects => new ProjectsLoadSuccessAction({ projects: PROJECTS_MODEL })),
    catchError(() => of(new ProjectsLoadFailureAction()))
  );
}
