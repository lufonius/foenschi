import { Action } from '@ngrx/store';
import { Project } from '../models/project.view-model';
import {SetLoad, SetLoadFailure, SetLoadSuccess} from "../../core/actions/base-loading.actions";
import {SkillGroup} from "../models/skill-group.view-model";
import {ProjectDetailPage} from "../models/project-detail-page.view-model";
import {ProjectBlock} from "../models/project-block.view-model";

export enum ProjectDetailPageActionTypes {
  LoadProjectDetailPage = '[ProjectDetailPage] LoadProjectDetailPage',
  ProjectDetailPageLoadSuccess = '[ProjectDetailPage] ProjectDetailPageLoadSuccess',
  ProjectDetailPageLoadFailure = '[ProjectDetailPage] ProjectDetailPageLoadFailure',
  ProjectDetailPageLoading = '[ProjectDetailPage] ProjectDetailPageLoading',
  SetPageState = '[ProjectDetailPage] SetPageState',
  SetActiveProjectBlock = '[ProjectDetailPage] SetActiveProjectBlock'
}

export class LoadProjectDetailPageAction extends SetLoad implements Action {
  readonly type = ProjectDetailPageActionTypes.LoadProjectDetailPage;

  constructor(public payload: { projectId: string }) {
    super();
  }
}

export class ProjectDetailPageLoadSuccessAction extends SetLoadSuccess implements Action {
  readonly type = ProjectDetailPageActionTypes.ProjectDetailPageLoadSuccess;

  constructor(public payload: { projectDetailPage: ProjectDetailPage }, requestId: string) {
    super(requestId);
  }
}

export class ProjectDetailPageLoadFailureAction extends SetLoadFailure implements Action {
  readonly type = ProjectDetailPageActionTypes.ProjectDetailPageLoadFailure;

  constructor(requestId: string) {
    super(requestId);
  }
}

export class ProjectDetailPageLoadingAction implements Action {
  readonly type = ProjectDetailPageActionTypes.ProjectDetailPageLoading;
}

export class ProjectDetailPageStateAction implements Action {
  readonly type = ProjectDetailPageActionTypes.SetPageState;

  constructor(public payload: { state: 'gallery' | 'info' }) {}
}

export class SetActiveProjectBlockAction implements Action {
  readonly type = ProjectDetailPageActionTypes.SetActiveProjectBlock;

  constructor(public payload: { activeBlock: ProjectBlock }) {}
}

export type ProjectDetailPageActions =
  LoadProjectDetailPageAction |
  ProjectDetailPageLoadSuccessAction |
  ProjectDetailPageLoadFailureAction |
  ProjectDetailPageLoadingAction;
