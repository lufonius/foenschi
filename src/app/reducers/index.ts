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
