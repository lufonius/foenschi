import { Action } from '@ngrx/store';
import { NavigationItemAdapter } from '../models/navigation-item-adapter.view-model';
import { Navigation } from '../models/navigation.model';
import { SetLoad, SetLoadFailure, SetLoadSuccess } from './base-loading.actions';

export enum NavigationActionTypes {
  LoadNavigation = '[Navigation] LoadNavigation',
  NavigationLoading = '[Navigation] NavigationLoading',
  NavigationLoadSuccess = '[Navigation] NavigationLoadSuccess',
  NavigationLoadFailure = '[Navigation] NavigationLoadFailure',
  SetActiveNavigationViewModel = '[Navigation] SetActiveNavigationViewModel'
}

export class LoadNavigationAction extends SetLoad implements Action {
  readonly type = NavigationActionTypes.LoadNavigation;
}

export class NavigationLoadingAction implements Action {
  readonly type = NavigationActionTypes.NavigationLoading;
}

export class NavigationLoadSuccessAction extends SetLoadSuccess implements Action {
  readonly type = NavigationActionTypes.NavigationLoadSuccess;

  constructor(public payload: { navigation: Navigation }, requestId: string) {
    super(requestId);
  }
}

export class NavigationLoadFailureAction extends SetLoadFailure implements Action {
  readonly type = NavigationActionTypes.NavigationLoadFailure;

  constructor(requestId: string) {
    super(requestId);
  }
}

export class SetActiveNavigationViewModelAction implements Action {
  readonly type = NavigationActionTypes.SetActiveNavigationViewModel;

  constructor(public payload: { item: NavigationItemAdapter }) {
  }
}

export type NavigationActions =
  | LoadNavigationAction
  | NavigationLoadingAction
  | NavigationLoadSuccessAction
  | NavigationLoadFailureAction
  | SetActiveNavigationViewModelAction;
