import { Action } from '@ngrx/store';

export enum LayoutActionTypes {
  changeNavVisibility = '[Layout] ChangeNavVisibilityAction',
  toggleNavVisibility = '[Layout] toggleNavVisibilityAction',
  setAboutMeSectionPosition = '[Layout] setAboutMeSectionPosition',
  setProjectsSectionPosition = '[Layout] setProjectsSectionPosition',
  setContactSectionPosition = '[Layout] setContactSectionPosition',
  setIsMobileMediaQuery = '[Layout] setIsMobileMediaQuery',
  setNavbarHeight = '[Layout] setNavbarHeight',
  setFrontPageScrollYOffset = '[Layout] setFrontPageScrollYOffset'
}

export class ChangeNavVisibilityAction implements Action {
  readonly type = LayoutActionTypes.changeNavVisibility;

  constructor(public visible: boolean) {}
}

export class ToggleNavVisibilityAction implements Action {
  readonly type = LayoutActionTypes.toggleNavVisibility;
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

export class SetNavbarHeightAction implements Action {
  readonly type = LayoutActionTypes.setNavbarHeight;

  constructor(public height: number) {}
}

export class SetFrontPageScrollYOffsetAction implements Action {
  readonly type = LayoutActionTypes.setFrontPageScrollYOffset;

  constructor(public yOffset: number) {}
}

export type LayoutActions =
  ChangeNavVisibilityAction |
  ToggleNavVisibilityAction |
  SetAboutMeSectionPositionAction |
  SetContactSectionPositionAction |
  SetProjectsSectionPositionAction |
  SetMediaQueryAction |
  SetFrontPageScrollYOffsetAction;
