import { Action } from '@ngrx/store';

export enum LayoutActionTypes {
  setNavigationVisible = '[Layout] setNavigationVisible',
  toggleNavigationVisibility = '[Layout] toggleNavVisibilityAction',
  setEntrySectionPosition = '[Layout] setEntrySectionPosition',
  setAboutMeSectionPosition = '[Layout] setAboutMeSectionPosition',
  setProjectsSectionPosition = '[Layout] setProjectsSectionPosition',
  setContactSectionPosition = '[Layout] setContactSectionPosition',
  setIsMobileMediaQuery = '[Layout] setIsMobileMediaQuery',
  setNavigationBarHeight = '[Layout] setNavigationBarHeight',
  setCurrentPageScrollYOffset = '[Layout] setCurrentPageScrollYOffset'
}

export class SetNavigationVisibileAction implements Action {
  readonly type = LayoutActionTypes.setNavigationVisible;

  constructor(public payload: { visible: boolean }) {}
}

export class ToggleNavigationVisibilityAction implements Action {
  readonly type = LayoutActionTypes.toggleNavigationVisibility;
}

export class SetEntrySectionPositionAction implements Action {
  readonly type = LayoutActionTypes.setEntrySectionPosition;

  constructor(public payload: { position: {x: number, y: number }}) {}
}

export class SetAboutMeSectionPositionAction implements Action {
  readonly type = LayoutActionTypes.setAboutMeSectionPosition;

  constructor(public payload: { position: {x: number, y: number }}) {}
}

export class SetProjectsSectionPositionAction implements Action {
  readonly type = LayoutActionTypes.setProjectsSectionPosition;

  constructor(public payload: { position: {x: number, y: number}}) {}
}

export class SetContactSectionPositionAction implements Action {
  readonly type = LayoutActionTypes.setContactSectionPosition;

  constructor(public payload: { position: {x: number, y: number}}) {}
}

export class SetMediaQueryAction implements Action {
  readonly type = LayoutActionTypes.setIsMobileMediaQuery;

  constructor(public payload: { isMobileMediaQuery: boolean }) {}
}

export class SetNavigationBarHeightAction implements Action {
  readonly type = LayoutActionTypes.setNavigationBarHeight;

  constructor(public payload: { height: number }) {}
}

export class SetCurrentPageScrollYOffsetAction implements Action {
  readonly type = LayoutActionTypes.setCurrentPageScrollYOffset;

  constructor(public payload: { yOffset: number }) {}
}


export type LayoutActions =
  SetNavigationVisibileAction |
  ToggleNavigationVisibilityAction |
  SetAboutMeSectionPositionAction |
  SetContactSectionPositionAction |
  SetProjectsSectionPositionAction |
  SetMediaQueryAction |
  SetCurrentPageScrollYOffsetAction;
