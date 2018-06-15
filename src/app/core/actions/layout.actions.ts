import { Action } from '@ngrx/store';

export enum LayoutActionTypes {
  setNavigationVisible = '[Layout] setNavigationVisible',
  toggleNavigationVisibility = '[Layout] toggleNavVisibilityAction',
  setAboutMeSectionPosition = '[Layout] setAboutMeSectionPosition',
  setProjectsSectionPosition = '[Layout] setProjectsSectionPosition',
  setContactSectionPosition = '[Layout] setContactSectionPosition',
  setIsMobileMediaQuery = '[Layout] setIsMobileMediaQuery',
  setNavigationBarHeight = '[Layout] setNavigationBarHeight',
  setFrontPageScrollYOffset = '[Layout] setFrontPageScrollYOffset'
}

export class SetNavigationVisibileAction implements Action {
  readonly type = LayoutActionTypes.setNavigationVisible;

  constructor(public visible: boolean) {}
}

export class ToggleNavigationVisibilityAction implements Action {
  readonly type = LayoutActionTypes.toggleNavigationVisibility;
}

export class SetAboutMeSectionPositionAction implements Action {
  readonly type = LayoutActionTypes.setAboutMeSectionPosition;

  constructor(public position: {x: number, y: number}) {}
}

export class SetProjectsSectionPositionAction implements Action {
  readonly type = LayoutActionTypes.setProjectsSectionPosition;

  constructor(public position: {x: number, y: number}) {}
}

export class SetContactSectionPositionAction implements Action {
  readonly type = LayoutActionTypes.setContactSectionPosition;

  constructor(public position: {x: number, y: number}) {}
}

export class SetMediaQueryAction implements Action {
  readonly type = LayoutActionTypes.setIsMobileMediaQuery;

  constructor(public isMobileMediaQuery: boolean) {}
}

export class SetNavigationBarHeightAction implements Action {
  readonly type = LayoutActionTypes.setNavigationBarHeight;

  constructor(public height: number) {}
}

export class SetFrontPageScrollYOffsetAction implements Action {
  readonly type = LayoutActionTypes.setFrontPageScrollYOffset;

  constructor(public yOffset: number) {}
}

export type LayoutActions =
  SetNavigationVisibileAction |
  ToggleNavigationVisibilityAction |
  SetAboutMeSectionPositionAction |
  SetContactSectionPositionAction |
  SetProjectsSectionPositionAction |
  SetMediaQueryAction |
  SetFrontPageScrollYOffsetAction;
