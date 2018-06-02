import { Action } from '@ngrx/store';

export enum LayoutActionTypes {
  changeNavVisibility = '[Layout] ChangeNavVisibilityAction',
  toggleNavVisibility = '[Layout] toggleNavVisibilityAction'

}

export class ChangeNavVisibilityAction implements Action {
  readonly type = LayoutActionTypes.changeNavVisibility;

  constructor(public visible: boolean) {}
}

export class ToggleNavVisibilityAction implements Action {
  readonly type = LayoutActionTypes.toggleNavVisibility;
}

export type LayoutActions = ChangeNavVisibilityAction | ToggleNavVisibilityAction;
