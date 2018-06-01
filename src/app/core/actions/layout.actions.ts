import { Action } from '@ngrx/store';

export enum LayoutActionTypes {
  LoadLayouts = '[Layout] Load Layouts'
}

export class Layout implements Action {
  readonly type = LayoutActionTypes.LoadLayouts;
}

//export type LayoutActions = LoadLayouts;
