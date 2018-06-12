import { Action } from '@ngrx/store';
import {
  ChangeNavVisibilityAction,
  LayoutActionTypes,
  SetAboutMeSectionPositionAction,
  SetContactSectionPositionAction, SetFrontPageScrollYOffsetAction,
  SetMediaQueryAction, SetNavbarHeightAction,
  SetProjectsSectionPositionAction
} from "../actions/layout.actions";


export interface State {
  navVisible: boolean;
  isMobileMediaQuery: boolean;
  frontPageScrollYOffset: number;
  aboutMeSectionPosition: {x: number, y: number};
  projectsSectionPosition: {x: number, y: number};
  contactSectionPosition: {x: number, y: number};
  navbarHeight: number;
}

export const initialState: State = {
  navVisible: true,
  isMobileMediaQuery: false,
  aboutMeSectionPosition: {x:0, y: 0},
  projectsSectionPosition: {x:0, y: 0},
  contactSectionPosition: {x:0, y: 0},
  navbarHeight: 0,
  frontPageScrollYOffset: 0
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {

    case LayoutActionTypes.changeNavVisibility: {
      return {
        ...state,
        navVisible: (<ChangeNavVisibilityAction>action).visible
      }
    }

    case LayoutActionTypes.toggleNavVisibility: {
      return {
        ...state,
        navVisible: !state.navVisible
      }
    }

    case LayoutActionTypes.setIsMobileMediaQuery: {
      return {
        ...state,
        isMobileMediaQuery: (<SetMediaQueryAction>action).isMobileMediaQuery
      }
    }

    case LayoutActionTypes.setAboutMeSectionPosition: {
      return {
        ...state,
        aboutMeSectionPosition: (<SetAboutMeSectionPositionAction>action).position
      }
    }

    case LayoutActionTypes.setContactSectionPosition: {
      return {
        ...state,
        contactSectionPosition: (<SetContactSectionPositionAction>action).position
      }
    }

    case LayoutActionTypes.setProjectsSectionPosition: {
      return {
        ...state,
        projectsSectionPosition: (<SetProjectsSectionPositionAction>action).position
      }
    }

    case LayoutActionTypes.setNavbarHeight: {
      return {
        ...state,
        navbarHeight: (<SetNavbarHeightAction>action).height
      }
    }

    case LayoutActionTypes.setFrontPageScrollYOffset: {
      return {
        ...state,
        frontPageScrollYOffset: (<SetFrontPageScrollYOffsetAction>action).yOffset
      }
    }

    default:
      return state;
  }
}

export const getNavVisibleState = (state: State) => state.navVisible;
export const getIsMobileMediaQueryState = (state: State) => state.isMobileMediaQuery;
export const getAboutMeSectionPositionState = (state: State) => state.aboutMeSectionPosition;
export const getProjectsSectionPositionState = (state: State) => state.projectsSectionPosition;
export const getContactSectionPositionState = (state: State) => state.contactSectionPosition;
export const getNavbarHeightState = (state: State) => state.navbarHeight;
export const getFrontPageScrollYOffsetState = (state: State) => state.frontPageScrollYOffset;
