import { routerReducer, RouterReducerState } from "@ngrx/router-store";
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromLayout from '../core/reducers/layout.reducer';
import * as fromNavigation from '../core/reducers/navigation.reducer';
import * as fromLanguage from '../core/reducers/language.reducer';
import { NavigationItemAdapter } from "../core/models/navigation-item-adapter.view-model";

export interface State {
  layout: fromLayout.State,
  navigation: fromNavigation.State,
  router: RouterReducerState,
  language: fromLanguage.State
}

export const reducers: ActionReducerMap<State, any> = {
  layout: fromLayout.reducer,
  navigation: fromNavigation.reducer,
  router: routerReducer,
  language: fromLanguage.reducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

export const getLayoutState = createFeatureSelector<fromLayout.State>('layout');
export const getNavigationState = createFeatureSelector<fromNavigation.State>('navigation');
export const getLanguageState = createFeatureSelector<fromLanguage.State>('language');

export const getNavigationVisibleState = createSelector(
  getLayoutState,
  fromLayout.getNavigationVisibleState
);

export const getIsMobileMediaQueryState = createSelector(
  getLayoutState,
  fromLayout.getIsMobileMediaQueryState
);

export const getSectionPositionsState = createSelector(
  getLayoutState,
  fromLayout.getSectionPositions
);

export const getNavbarHeightState = createSelector(
  getLayoutState,
  fromLayout.getNavigationBarHeightState
);

export const getCurrentPageScrollYOffsetState = createSelector(
  getLayoutState,
  fromLayout.getCurrentPageScrollYOffsetState
);

export const getNavigationItemsState = createSelector(
  getNavigationState,
  fromNavigation.getNavigationItemsState
);

export const getActiveNavigationItemIdState = createSelector(
  getNavigationState,
  fromNavigation.getActiveNavigationItemIdState
);

export const getNavigationItemsIndexState = createSelector(
  getNavigationState,
  fromNavigation.getNavigationItemsIndexState
);

export const getActiveNavigationItemState = createSelector(
  getNavigationItemsIndexState,
  getActiveNavigationItemIdState,
  (index: {[id: string]: NavigationItemAdapter}, id: string) => {
    return index[id];
  }
);

export const getNavigationTitleState = createSelector(
  getNavigationState,
  fromNavigation.getNavigationTitleState
);

export const getCurrentLanguageState = createSelector(
  getLanguageState,
  fromLanguage.getCurrentLanguage
);

