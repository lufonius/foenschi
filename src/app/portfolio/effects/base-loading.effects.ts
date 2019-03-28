import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, catchError, filter, mergeMap, withLatestFrom } from 'rxjs/operators';
import {
	SetLoad,
	SetLoadAction,
	SetLoadFailure,
	SetLoadFailureAction,
	SetLoadSuccessAction
} from '../../core/actions/base-loading.actions';
import {
	FrontPageActionTypes,
	FrontPageLoadFailureAction,
	FrontPageLoadSuccessAction,
	LoadFrontPageAction
} from '../actions/front-page.actions';
import {
	LoadProjectsAction,
	ProjectActionTypes,
	ProjectsLoadFailureAction,
	ProjectsLoadSuccessAction
} from '../actions/project.actions';
import { LoadSkillsPageAction, SkillsPageActionTypes } from '../actions/skills.actions';
import { ProjectDetailPageActionTypes } from '../actions/project-detail-page.actions';
import { ResumePageActionTypes } from '../actions/resume-page.actions';

@Injectable()
export class BaseLoadingEffects {
	constructor(public actions$: Actions) {}

	@Effect()
	generalizeLoadAction$: Observable<Action> = this.actions$.pipe(
		ofType(
			FrontPageActionTypes.LoadFrontPage,
			ProjectActionTypes.LoadProjects,
			SkillsPageActionTypes.LoadSkillsPage,
			ProjectDetailPageActionTypes.LoadProjectDetailPage,
			ResumePageActionTypes.LoadResumePage
		),
		map((loadAction: LoadFrontPageAction | LoadProjectsAction) => new SetLoadAction(loadAction.request))
	);

	@Effect()
	generalizeLoadSuccessAction$: Observable<Action> = this.actions$.pipe(
		ofType(
			FrontPageActionTypes.FrontPageLoadSuccess,
			ProjectActionTypes.ProjectsLoadSuccess,
			SkillsPageActionTypes.SkillsPageLoadSuccess,
			ProjectDetailPageActionTypes.ProjectDetailPageLoadSuccess,
			ResumePageActionTypes.ResumePageLoadSuccess
		),
		map(
			(loadSuccessAction: FrontPageLoadSuccessAction | ProjectsLoadSuccessAction) =>
				new SetLoadSuccessAction(loadSuccessAction.request)
		)
	);

	@Effect()
	generalizeLoadFailureAction$: Observable<Action> = this.actions$.pipe(
		ofType(
			FrontPageActionTypes.FrontPageLoadFailure,
			ProjectActionTypes.ProjectsLoadFailure,
			SkillsPageActionTypes.SkillsPageLoadFailure,
			ProjectDetailPageActionTypes.ProjectDetailPageLoadFailure,
			ResumePageActionTypes.ResumePageLoadFailure
		),
		map(
			(loadFailureAction: FrontPageLoadFailureAction | ProjectsLoadFailureAction) =>
				new SetLoadFailureAction(loadFailureAction.request)
		)
	);
}
