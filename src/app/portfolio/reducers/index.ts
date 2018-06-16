import * as fromPortfolio from "./project.reducer";
import {createFeatureSelector, createSelector} from "@ngrx/store";
import * as fromProject from './project.reducer';
import * as fromFrontPage from './front-page.reducer';
import * as fromLanguage from './language.reducer';

export interface State {
  project: fromProject.State,
  frontPage: fromFrontPage.State,
  language: fromLanguage.State
}

export const getPortfolioState = createFeatureSelector<State>('portfolio');

export const getProjectState = createSelector(
  getPortfolioState,
  (state: State) => state.project
);

export const getLanguageState = createSelector(
  getPortfolioState,
  (state: State) => state.language
);

export const getFrontPageState = createSelector(
  getPortfolioState,
  (state: State) => state.frontPage
);

export const getProjectsState = createSelector(
  getProjectState,
  fromProject.getProjectsState
);

export const getProjectsLoadingState = createSelector(
  getProjectState,
  fromPortfolio.getProjectsLoadingState
);

export const getCurrentLanguageState = createSelector(
  getLanguageState,
  fromLanguage.getCurrentLanguage
);

export const getActiveProjectIdState = createSelector(
  getFrontPageState,
  fromFrontPage.getActiveProjectId
);

export const getEntrySectionState = createSelector(
  getFrontPageState,
  fromFrontPage.getEntrySectionState
);

export const getAboutMeSectionState = createSelector(
  getFrontPageState,
  fromFrontPage.getAboutMeSectionState
);

export const getProjectSectionState = createSelector(
  getFrontPageState,
  fromFrontPage.getProjectsSectionState
);

export const getContactSectionState = createSelector(
  getFrontPageState,
  fromFrontPage.getContactSectionState
);

export const getContactSectionFormState = createSelector(
  getFrontPageState,
  fromFrontPage.getContactSectionFormState
);

export const getAboutMeSectionSubsectionState = createSelector(
  getFrontPageState,
  fromFrontPage.getAboutMeSectionSubsectionState
);
