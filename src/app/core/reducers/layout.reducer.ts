import { Action } from '@ngrx/store';
import {
  SetNavigationVisibileAction,
  LayoutActionTypes,
  SetAboutMeSectionPositionAction,
  SetContactSectionPositionAction,
  SetFrontPageScrollYOffsetAction,
  SetMediaQueryAction,
  SetNavigationBarHeightAction,
  SetProjectsSectionPositionAction
} from "../actions/layout.actions";


export interface State {
  navigationVisible: boolean;
  isMobileMediaQuery: boolean;
  frontPageScrollYOffset: number;
  aboutMeSectionPosition: {x: number, y: number};
  projectsSectionPosition: {x: number, y: number};
  contactSectionPosition: {x: number, y: number};
  navigationBarHeight: number;
}

export const initialState: State = {
  navigationVisible: false,
  isMobileMediaQuery: false,
  aboutMeSectionPosition: {x:0, y: 0},
  projectsSectionPosition: {x:0, y: 0},
  contactSectionPosition: {x:0, y: 0},
  navigationBarHeight: 0,
  frontPageScrollYOffset: 0
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {

    case LayoutActionTypes.setNavigationVisible: {
      return {
        ...state,
        navigationVisible: (<SetNavigationVisibileAction>action).visible
      }
    }

    case LayoutActionTypes.toggleNavigationVisibility: {
      return {
        ...state,
        navigationVisible: !state.navigationVisible
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

    case LayoutActionTypes.setNavigationBarHeight: {
      return {
        ...state,
        navigationBarHeight: (<SetNavigationBarHeightAction>action).height
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

export const getNavigationVisibleState = (state: State) => state.navigationVisible;
export const getIsMobileMediaQueryState = (state: State) => state.isMobileMediaQuery;
export const getAboutMeSectionPositionState = (state: State) => state.aboutMeSectionPosition;
export const getProjectsSectionPositionState = (state: State) => state.projectsSectionPosition;
export const getContactSectionPositionState = (state: State) => state.contactSectionPosition;
export const getNavigationBarHeightState = (state: State) => state.navigationBarHeight;
export const getFrontPageScrollYOffsetState = (state: State) => state.frontPageScrollYOffset;
