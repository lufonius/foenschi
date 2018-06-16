import { Action } from '@ngrx/store';
import { Project} from '../models/project.view-model';

export enum ProjectActionTypes {
  LoadProjects = '[Project] Load Projects',
  ProjectsLoading = '[Projects] ProjectsLoading',
  ProjectsLoadSuccess = '[Projects] ProjectsLoadSuccessAction',
  ProjectsLoadFailure = '[Projects] ProjectsLoadFailureAction'
}

export class LoadProjectsAction implements Action {
  readonly type = ProjectActionTypes.LoadProjects;
}

export class ProjectsLoadingAction implements Action {
  readonly type = ProjectActionTypes.ProjectsLoading;

  constructor(public payload: { loading: boolean }) {}
}

export class ProjectsLoadSuccessAction implements Action {
  readonly type = ProjectActionTypes.ProjectsLoadSuccess;

  constructor(public payload: { projects: Project[] }) {}
}

export class ProjectsLoadFailureAction implements Action {
  readonly type = ProjectActionTypes.ProjectsLoadFailure;
}


export type ProjectActions =
 LoadProjectsAction |
  ProjectsLoadSuccessAction |
  ProjectsLoadFailureAction |
  ProjectsLoadingAction;
