import { Action } from '@ngrx/store';
import { ResumePage } from "../models/resume-page.view-model";
import {SetLoad, SetLoadFailure, SetLoadSuccess} from "../../core/actions/base-loading.actions";

export enum ResumePageActionTypes {
  LoadResumePage = '[ResumePage] LoadResumePage',
  ResumePageLoadSuccess = '[ResumePage] ResumePageLoadSuccess',
  ResumePageLoadFailure = '[ResumePage] ResumePageLoadFailure',
  ResumePageLoading = '[ResumePage] ResumePageLoading'
}

export class LoadResumePageAction extends SetLoad implements Action {
  readonly type = ResumePageActionTypes.LoadResumePage;
}

export class ResumePageLoadSuccessAction extends SetLoadSuccess implements Action {
  readonly type = ResumePageActionTypes.ResumePageLoadSuccess;

  constructor(public payload: { resumePage: ResumePage }, requestId: string) {
    super(requestId);
  }
}

export class ResumePageLoadFailureAction extends SetLoadFailure implements Action {
  readonly type = ResumePageActionTypes.ResumePageLoadFailure;

  constructor(requestId: string) {
    super(requestId);
  }
}

export class ResumePageLoadingAction implements Action {
  readonly type = ResumePageActionTypes.ResumePageLoading;
}

export type ResumePageActions =
  LoadResumePageAction |
  ResumePageLoadSuccessAction |
  ResumePageLoadFailureAction |
  ResumePageLoadingAction;
