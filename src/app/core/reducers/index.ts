import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { ActionReducerMap, createFeatureSelector, createSelector, MetaReducer } from '@ngrx/store';
import * as fromLayout from './layout.reducer';
import * as fromNavigation from './navigation.reducer';
import * as fromLanguage from './language.reducer';
import { NavigationItemAdapter } from '../models/navigation-item-adapter.view-model';
import { localStorageMetaReducer } from './localstorage.meta-reducer';
import * as _ from 'lodash';

export interface State {
  layout: fromLayout.State;
  navigation: fromNavigation.State;
  router: RouterReducerState;
  language: fromLanguage.State;
}

export const reducers: ActionReducerMap<State, any> = {
  layout: fromLayout.reducer,
  navigation: fromNavigation.reducer,
  router: routerReducer,
  language: fromLanguage.reducer
};

//!environment.production ? [] : [];
export const metaReducers: MetaReducer<State>[] = [localStorageMetaReducer];

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
  (index: { [id: string]: NavigationItemAdapter }, id: string) => {
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

export const getAvailableLanguagesState = createSelector(
  getLanguageState,
  fromLanguage.getAvailableLanguagesState
);

export const getLoadingListState = createSelector(
  getLayoutState,
  fromLayout.getLoadingList
);

export const getIsSomethingLoading = createSelector(
  getLoadingListState,
  (loadingList: { [id: string]: { loading: boolean; id: string } }) => {
    let requestsInProgess = _.filter(loadingList, (request) => request.loading);
    return requestsInProgess.length > 0;
  }
);

export const getQuickNavTitles = createSelector(
  getLayoutState,
  fromLayout.getQuickNavTitles
);

export const getNavigationTransformOriginState = createSelector(
  getLayoutState,
  fromLayout.getNavigationTransformOriginState
);
