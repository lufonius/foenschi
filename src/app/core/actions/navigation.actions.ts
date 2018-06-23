import { Action } from '@ngrx/store';
import {NavigationItem} from "../models/navigation-item.model";
import {NavigationItemAdapter} from "../models/navigation-item-adapter.view-model";
import {Navigation} from "../models/navigation.model";

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

  constructor(public payload: { navigation: Navigation }) {}
}

export class NavigationLoadFailureAction implements Action {
  readonly type = NavigationActionTypes.NavigationLoadFailure;
}

export class SetActiveNavigationViewModelAction implements Action {
  readonly type = NavigationActionTypes.SetActiveNavigationViewModel;

  constructor(public payload: { item: NavigationItemAdapter }) {}
}

export type NavigationActions =
  LoadNavigationAction |
  NavigationLoadingAction |
  NavigationLoadSuccessAction |
  NavigationLoadFailureAction |
  SetActiveNavigationViewModelAction;
