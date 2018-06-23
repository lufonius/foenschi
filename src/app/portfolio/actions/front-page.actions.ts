import { Action } from '@ngrx/store';
import {FrontPage} from "../models/front-page.view-model";

export enum FrontPageActionTypes {
  LoadFrontPage = '[FrontPage] LoadFrontPage',
  FrontPageLoadSuccess = '[FrontPage] FrontPageLoadSuccess',
  FrontPageLoadFailure = '[FrontPage] FrontPageLoadFailure',
  FrontPageLoading = '[FrontPage] FrontPageLoading',
  SetActiveProjectIdAction = '[FrontPage] SetActiveProjectIdAction'
}

export class LoadFrontPageAction implements Action {
  readonly type = FrontPageActionTypes.LoadFrontPage;
}

export class FrontPageLoadSuccessAction implements Action {
  readonly type = FrontPageActionTypes.FrontPageLoadSuccess;

  constructor(public payload: { frontPage: FrontPage }) {}
}

export class FrontPageLoadFailureAction implements Action {
  readonly type = FrontPageActionTypes.FrontPageLoadFailure;

  constructor(public payload: { error: string }) {}
}

export class FrontPageLoadingAction implements Action {
  readonly type = FrontPageActionTypes.FrontPageLoading;
}

export class SetActiveProjectIdAction implements Action {
  readonly type = FrontPageActionTypes.SetActiveProjectIdAction;

  constructor(public payload: { id: string }) {}
}

export type FrontPageActions =
  LoadFrontPageAction |
  FrontPageLoadSuccessAction |
  FrontPageLoadFailureAction |
  FrontPageLoadingAction;
