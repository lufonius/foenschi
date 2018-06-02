import { Action } from '@ngrx/store';
import {ChangeNavVisibilityAction, LayoutActionTypes} from "../actions/layout.actions";


export interface State {
  navVisible: boolean;
}

export const initialState: State = {
  navVisible: false
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

    default:
      return state;
  }
}

export const getNavVisibleState = (state: State) => state.navVisible;
