import { Action } from '@ngrx/store';
import { NavigationViewModelAdapter } from "../models/navigation-adapter.view-model";
import { NavigationModel } from "../models/navigation.model";
import {
  NavigationActionTypes, NavigationLoadSuccessAction,
  SetActiveNavigationViewModelAction
} from "../actions/navigation.actions";
import * as uuidv4 from 'uuid/v4';
import * as _ from 'lodash';

type NavigationViewModelIndex = {[id: string]: NavigationViewModelAdapter};

export interface State {
  navigationItems: NavigationViewModelAdapter[];
  //the index is used for accessing the nav item quickly
  navigationItemsIndex: NavigationViewModelIndex;
  activeNavigationItemId: string;
}

export const initialState: State = {
  navigationItems: [],
  navigationItemsIndex: {},
  activeNavigationItemId: null
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {

    case NavigationActionTypes.NavigationLoadSuccess: {
      let index = {};
      const navigationModelItems = (<NavigationLoadSuccessAction>action).navigationModel;
      const navigationViewModelItems = generateNavigationViewModel(navigationModelItems, index);

      return {
        ...state,
        navigationItems: navigationViewModelItems,
        navigationItemsIndex: index
      }
    }

    case NavigationActionTypes.SetActiveNavigationViewModel: {
      const item = (<SetActiveNavigationViewModelAction>action).item;
      let id = null;

      if(item) {
        id = item.id;
      }

      return {
        ...state,
        activeNavigationItemId: id,
        navigationItems: state.navigationItems,
        navigationItemsIndex: state.navigationItemsIndex
      };
    }

    default:
      return state;
  }
}

//passing index as a reference parameter is a bit messy, but it makes it much easier,
//otherwise the recursive function has to return the partial indexes too, a new type has to be make etc.
const generateNavigationViewModel
  = (navigationModelItems: NavigationModel[], index: NavigationViewModelIndex): NavigationViewModelAdapter[] => {
  let navigationViewModelItems: NavigationViewModelAdapter[] = [];

  navigationModelItems.forEach((navigationModelItem: NavigationModel) => {
    let navigationViewModelItem = new NavigationViewModelAdapter(navigationModelItem);
    navigationViewModelItem.id = uuidv4();

    if(navigationModelItem.children) {
      let navigationViewModelChildItems = generateNavigationViewModel(navigationModelItem.children, index);

      navigationViewModelItem.children = navigationViewModelChildItems;
      navigationViewModelItem.hasChildren = navigationViewModelChildItems.length > 0;
    } else {
      navigationViewModelItem.children = null;
      navigationViewModelItem.hasChildren = false;
    }

    index[navigationViewModelItem.id] = _.cloneDeep(navigationViewModelItem);
    navigationViewModelItems.push(navigationViewModelItem);
  });

  return navigationViewModelItems;
}

export const getNavigationItemsState = (state: State) => state.navigationItems;
export const getActiveNavigationItemIdState = (state: State) => state.activeNavigationItemId;
export const getNavigationItemsIndexState = (state: State) => state.navigationItemsIndex;
