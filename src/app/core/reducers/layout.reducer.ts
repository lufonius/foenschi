import { Action } from '@ngrx/store';
import {
  SetNavigationVisibileAction,
  LayoutActionTypes,
  SetAboutMeSectionPositionAction,
  SetContactSectionPositionAction,
  SetMediaQueryAction,
  SetNavigationBarHeightAction,
  SetProjectsSectionPositionAction, SetCurrentPageScrollYOffsetAction, SetEntrySectionPositionAction
} from "../actions/layout.actions";

export interface SectionPositionsState {
  entrySectionPosition: {x: number, y: number};
  aboutMeSectionPosition: {x: number, y: number};
  projectsSectionPosition: {x: number, y: number};
  contactSectionPosition: {x: number, y: number};
}

export interface State {
  navigationVisible: boolean;
  isMobileMediaQuery: boolean;
  currentPageScrollYOffset: number;
  sectionPositions: SectionPositionsState;
  navigationBarHeight: number;
}

export const initialState: State = {
  navigationVisible: false,
  isMobileMediaQuery: false,
  sectionPositions: null,
  navigationBarHeight: 0,
  currentPageScrollYOffset: 0
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {

    case LayoutActionTypes.setNavigationVisible: {
      return {
        ...state,
        sectionPositions: {
          ...state.sectionPositions
        },
        navigationVisible: (<SetNavigationVisibileAction>action).payload.visible
      }
    }

    case LayoutActionTypes.toggleNavigationVisibility: {
      return {
        ...state,
        sectionPositions: {
          ...state.sectionPositions
        },
        navigationVisible: !state.navigationVisible
      }
    }

    case LayoutActionTypes.setIsMobileMediaQuery: {
      return {
        ...state,
        sectionPositions: {
          ...state.sectionPositions
        },
        isMobileMediaQuery: (<SetMediaQueryAction>action).payload.isMobileMediaQuery
      }
    }

    case LayoutActionTypes.setEntrySectionPosition: {
      return {
        ...state,
        sectionPositions: {
          ...state.sectionPositions,
          entrySectionPosition: (<SetEntrySectionPositionAction>action).payload.position
        }
      }
    }

    case LayoutActionTypes.setAboutMeSectionPosition: {
      return {
        ...state,
        sectionPositions: {
          ...state.sectionPositions,
          aboutMeSectionPosition: (<SetAboutMeSectionPositionAction>action).payload.position
        }
      }
    }

    case LayoutActionTypes.setContactSectionPosition: {
      return {
        ...state,
        sectionPositions: {
          ...state.sectionPositions,
          contactSectionPosition: (<SetContactSectionPositionAction>action).payload.position
        }
      }
    }

    case LayoutActionTypes.setProjectsSectionPosition: {
      return {
        ...state,
        sectionPositions: {
          ...state.sectionPositions,
          projectsSectionPosition: (<SetProjectsSectionPositionAction>action).payload.position
        }
      }
    }

    case LayoutActionTypes.setNavigationBarHeight: {
      return {
        ...state,
        sectionPositions: {
          ...state.sectionPositions
        },
        navigationBarHeight: (<SetNavigationBarHeightAction>action).payload.height
      }
    }

    case LayoutActionTypes.setCurrentPageScrollYOffset: {
      return {
        ...state,
        sectionPositions: {
          ...state.sectionPositions
        },
        currentPageScrollYOffset: (<SetCurrentPageScrollYOffsetAction>action).payload.yOffset
      }
    }

    default:
      return state;
  }
}

export const getNavigationVisibleState = (state: State) => state.navigationVisible;
export const getIsMobileMediaQueryState = (state: State) => state.isMobileMediaQuery;
export const getNavigationBarHeightState = (state: State) => state.navigationBarHeight;
export const getCurrentPageScrollYOffsetState = (state: State) => state.currentPageScrollYOffset;
export const getSectionPositions = (state: State) => state.sectionPositions;
