import { Action } from '@ngrx/store';
import { Project } from '../models/project.view-model';
import { SetLoad, SetLoadFailure, SetLoadSuccess } from '../../core/actions/base-loading.actions';

export enum ProjectActionTypes {
	LoadProjects = '[Project] Load Projects',
	ProjectsLoading = '[Projects] ProjectsLoading',
	ProjectsLoadSuccess = '[Projects] ProjectsLoadSuccessAction',
	ProjectsLoadFailure = '[Projects] ProjectsLoadFailureAction'
}

export class LoadProjectsAction extends SetLoad implements Action {
	readonly type = ProjectActionTypes.LoadProjects;
}

export class ProjectsLoadingAction implements Action {
	readonly type = ProjectActionTypes.ProjectsLoading;

	constructor(public payload: { loading: boolean }) {}
}

export class ProjectsLoadSuccessAction extends SetLoadSuccess implements Action {
	readonly type = ProjectActionTypes.ProjectsLoadSuccess;

	constructor(public payload: { projects: Project[] }, requestId: string) {
		super(requestId);
	}
}

export class ProjectsLoadFailureAction extends SetLoadFailure implements Action {
	readonly type = ProjectActionTypes.ProjectsLoadFailure;

	constructor(requestId: string) {
		super(requestId);
	}
}

export type ProjectActions =
	| LoadProjectsAction
	| ProjectsLoadSuccessAction
	| ProjectsLoadFailureAction
	| ProjectsLoadingAction;
