import { Action } from '@ngrx/store';
import {NavigationModel} from "../models/navigation.model";
import {NavigationViewModelAdapter} from "../models/navigation-adapter.view-model";

export enum NavigationActionTypes {
  LoadNavigation = '[Navigation] LoadNavigation',
  NavigationLoading = '[Navigation] NavigationLoading',
  NavigationLoadSuccess = '[Navigation] NavigationLoadSuccess',
  NavigationLoadFailure = '[Navigation] NavigationLoadFailure',
  SetActiveNavigationViewModel = '[Navigation] SetActiveNavigationViewModel'
}

export class LoadNavigationAction implements Action {
  readonly type = NavigationActionTypes.LoadNavigation;
}

export class NavigationLoadingAction implements Action {
  readonly type = NavigationActionTypes.NavigationLoading;
}

export class NavigationLoadSuccessAction implements Action {
  readonly type = NavigationActionTypes.NavigationLoadSuccess;

  constructor(public navigationModel: NavigationModel[]) {}
}

export class NavigationLoadFailureAction implements Action {
  readonly type = NavigationActionTypes.NavigationLoadFailure;
}

export class SetActiveNavigationViewModelAction implements Action {
  readonly type = NavigationActionTypes.SetActiveNavigationViewModel;

  constructor(public item: NavigationViewModelAdapter) {}
}

export type NavigationActions =
  LoadNavigationAction |
  NavigationLoadingAction |
  NavigationLoadSuccessAction |
  NavigationLoadFailureAction |
  SetActiveNavigationViewModelAction;
