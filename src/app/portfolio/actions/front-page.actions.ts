import { Action } from '@ngrx/store';
import { FrontPage } from '../models/front-page.view-model';
import { SetLoad, SetLoadFailure, SetLoadSuccess } from '../../core/actions/base-loading.actions';

export enum FrontPageActionTypes {
	LoadFrontPage = '[FrontPage] LoadFrontPage',
	FrontPageLoadSuccess = '[FrontPage] FrontPageLoadSuccess',
	FrontPageLoadFailure = '[FrontPage] FrontPageLoadFailure',
	FrontPageLoading = '[FrontPage] FrontPageLoading',
	SetActiveProjectIdAction = '[FrontPage] SetActiveProjectIdAction'
}

export class LoadFrontPageAction extends SetLoad implements Action {
	readonly type = FrontPageActionTypes.LoadFrontPage;
}

export class FrontPageLoadSuccessAction extends SetLoadSuccess implements Action {
	readonly type = FrontPageActionTypes.FrontPageLoadSuccess;

	constructor(public payload: { frontPage: FrontPage }, requestId: string) {
		super(requestId);
	}
}

export class FrontPageLoadFailureAction extends SetLoadFailure implements Action {
	readonly type = FrontPageActionTypes.FrontPageLoadFailure;

	constructor(requestId: string) {
		super(requestId);
	}
}

export class FrontPageLoadingAction implements Action {
	readonly type = FrontPageActionTypes.FrontPageLoading;
}

export class SetActiveProjectIdAction implements Action {
	readonly type = FrontPageActionTypes.SetActiveProjectIdAction;

	constructor(public payload: { id: string }) {}
}

export type FrontPageActions =
	| LoadFrontPageAction
	| FrontPageLoadSuccessAction
	| FrontPageLoadFailureAction
	| FrontPageLoadingAction;
