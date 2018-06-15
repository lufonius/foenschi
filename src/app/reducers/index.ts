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
import * as fromPortfolio from '../portfolio/reducers/project.reducer';
import {NavigationViewModelAdapter} from "../core/models/navigation-adapter.view-model";

export interface State {
  layout: fromLayout.State,
  navigation: fromNavigation.State,
  router: RouterReducerState
}

export const reducers: ActionReducerMap<State, any> = {
  layout: fromLayout.reducer,
  navigation: fromNavigation.reducer,
  router: routerReducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

export const getLayoutState = createFeatureSelector<fromLayout.State>('layout');
export const getNavigationState = createFeatureSelector<fromNavigation.State>('navigation');

export const getNavigationVisibleState = createSelector(
  getLayoutState,
  fromLayout.getNavigationVisibleState
);

export const getIsMobileMediaQueryState = createSelector(
  getLayoutState,
  fromLayout.getIsMobileMediaQueryState
);

export const getAboutMeSectionPositionState = createSelector(
  getLayoutState,
  fromLayout.getAboutMeSectionPositionState
);

export const getProjectsSectionPositionState = createSelector(
  getLayoutState,
  fromLayout.getProjectsSectionPositionState
);

export const getContactSectionPositionState = createSelector(
  getLayoutState,
  fromLayout.getContactSectionPositionState
);

export const getNavbarHeightState = createSelector(
  getLayoutState,
  fromLayout.getNavigationBarHeightState
);

export const getFrontPageScrollYOffsetState = createSelector(
  getLayoutState,
  fromLayout.getFrontPageScrollYOffsetState
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
  (index: {[id: string]: NavigationViewModelAdapter}, id: string) => {
    return index[id];
  }
);

