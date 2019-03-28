import { Action } from '@ngrx/store';
import { NavigationItemAdapter } from '../models/navigation-item-adapter.view-model';
import { NavigationItem } from '../models/navigation-item.model';
import {
  NavigationActionTypes,
  NavigationLoadSuccessAction,
  SetActiveNavigationViewModelAction
} from '../actions/navigation.actions';
import * as uuidv4 from 'uuid/v4';
import * as _ from 'lodash';

type NavigationViewModelIndex = { [id: string]: NavigationItemAdapter };

export interface State {
  navigationItems: NavigationItemAdapter[];
  //the index is used for accessing the nav item quickly
  navigationItemsIndex: NavigationViewModelIndex;
  activeNavigationItemId: string;
  navigationTitle: string;
}

export const initialState: State = {
  navigationItems: [],
  navigationItemsIndex: {},
  activeNavigationItemId: null,
  navigationTitle: ''
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case NavigationActionTypes.NavigationLoadSuccess: {
      let index = {};
      const navigationModelItems = (<NavigationLoadSuccessAction>action).payload.navigation.navigation;
      const navigationTitle = (<NavigationLoadSuccessAction>action).payload.navigation.navigationTitle;
      const navigationViewModelItems = generateNavigationViewModel(navigationModelItems, index);

      return {
        ...state,
        navigationItems: navigationViewModelItems,
        navigationItemsIndex: index,
        navigationTitle: navigationTitle
      };
    }

    case NavigationActionTypes.SetActiveNavigationViewModel: {
      const item = (<SetActiveNavigationViewModelAction>action).payload.item;
      let id = null;

      if (item) {
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
//otherwise the recursive function has to return the partial indexes too, a new type has to be made etc.
const generateNavigationViewModel = (
  navigationModelItems: NavigationItem[],
  index: NavigationViewModelIndex
): NavigationItemAdapter[] => {
  let navigationViewModelItems: NavigationItemAdapter[] = [];

  navigationModelItems.forEach((navigationModelItem: NavigationItem) => {
    let navigationViewModelItem = new NavigationItemAdapter(navigationModelItem);
    navigationViewModelItem.id = uuidv4();

    if (navigationModelItem.children) {
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
};

export const getNavigationItemsState = (state: State) => state.navigationItems;
export const getActiveNavigationItemIdState = (state: State) => state.activeNavigationItemId;
export const getNavigationItemsIndexState = (state: State) => state.navigationItemsIndex;
export const getNavigationTitleState = (state: State) => state.navigationTitle;
