import { Action } from '@ngrx/store';
import {FrontPage} from "../models/front-page.view-model";

export enum FrontPageActionTypes {
  LoadFrontPageViewModel = '[FrontPage] LoadFrontPageViewModel',
  FrontPageViewModelLoadSuccess = '[FrontPage] FrontPageViewModelLoadSuccess',
  FrontPageViewModelLoadFailure = '[FrontPage] FrontPageViewModelLoadFailure',
  FrontPageViewModelLoading = '[FrontPage] FrontPageViewModelLoading',
  SetActiveProjectIdAction = '[FrontPage] SetActiveProjectIdAction'
}

export class LoadFrontPageViewModelAction implements Action {
  readonly type = FrontPageActionTypes.LoadFrontPageViewModel;
}

export class FrontPageViewModelLoadSuccessAction implements Action {
  readonly type = FrontPageActionTypes.FrontPageViewModelLoadSuccess;

  constructor(public payload: { frontPageViewModel: FrontPage }) {}
}

export class FrontPageViewModelLoadFailureAction implements Action {
  readonly type = FrontPageActionTypes.FrontPageViewModelLoadFailure;

  constructor(public payload: { error: string }) {}
}

export class FrontPageViewModelLoadingAction implements Action {
  readonly type = FrontPageActionTypes.FrontPageViewModelLoading;
}

export class SetActiveProjectIdAction implements Action {
  readonly type = FrontPageActionTypes.SetActiveProjectIdAction;

  constructor(public payload: { id: string }) {}
}

export type FrontPageActions =
  LoadFrontPageViewModelAction |
  FrontPageViewModelLoadSuccessAction |
  FrontPageViewModelLoadFailureAction |
  FrontPageViewModelLoadingAction;
