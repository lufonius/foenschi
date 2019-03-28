import { Action } from '@ngrx/store';
import { SkillsPage } from '../models/skills-page.view-model';
import { SetLoad, SetLoadFailure, SetLoadSuccess } from '../../core/actions/base-loading.actions';
import { SkillGroup } from '../models/skill-group.view-model';

export enum SkillsPageActionTypes {
	LoadSkillsPage = '[SkillsPage] LoadSkillsPage',
	SkillsPageLoadSuccess = '[SkillsPage] SkillsPageLoadSuccess',
	SkillsPageLoadFailure = '[SkillsPage] SkillsPageLoadFailure',
	SkillsPageLoading = '[SkillsPage] SkillsPageLoading'
}

export class LoadSkillsPageAction extends SetLoad implements Action {
	readonly type = SkillsPageActionTypes.LoadSkillsPage;
}

export class SkillsPageLoadSuccessAction extends SetLoadSuccess implements Action {
	readonly type = SkillsPageActionTypes.SkillsPageLoadSuccess;

	constructor(public payload: { skillsPage: SkillsPage }, requestId: string) {
		super(requestId);
	}
}

export class SkillsPageLoadFailureAction extends SetLoadFailure implements Action {
	readonly type = SkillsPageActionTypes.SkillsPageLoadFailure;

	constructor(requestId: string) {
		super(requestId);
	}
}

export class SkillsPageLoadingAction implements Action {
	readonly type = SkillsPageActionTypes.SkillsPageLoading;
}

export type SkillsPageActions =
	| LoadSkillsPageAction
	| SkillsPageLoadSuccessAction
	| SkillsPageLoadFailureAction
	| SkillsPageLoadingAction;
