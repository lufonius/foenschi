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

export interface State {
  layout: fromLayout.State,
  router: RouterReducerState
}

export const reducers: ActionReducerMap<State, any> = {
  layout: fromLayout.reducer,
  router: routerReducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

export const getLayoutState = createFeatureSelector<fromLayout.State>('layout');

export const getNavVisibilityState = createSelector(
  getLayoutState,
  fromLayout.getNavVisibleState
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
  fromLayout.getNavbarHeightState
);

export const getFrontPageScrollYOffsetState = createSelector(
  getLayoutState,
  fromLayout.getFrontPageScrollYOffsetState
);
