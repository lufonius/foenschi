import * as fromPortfolio from "./project.reducer";
import {createFeatureSelector, createSelector} from "@ngrx/store";
import * as fromProject from './project.reducer';

export interface State {
  project: fromProject.State
}

export const getPortfolioState = createFeatureSelector<State>('portfolio');

export const getProjectState = createSelector(
  getPortfolioState,
  (state: State) => state.project
);

export const getProjectSectionsState = createSelector(
  getProjectState,
  fromPortfolio.getProjectSectionsState
);

export const getActiveProjectSectionState = createSelector(
  getProjectState,
  fromPortfolio.getActiveProjectSectionState
);

export const getProjectsLoadingState = createSelector(
  getProjectState,
  fromPortfolio.getProjectsLoadingState
);
