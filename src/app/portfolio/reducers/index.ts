import * as fromPortfolio from './project.reducer';
import * as fromProject from './project.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromFrontPage from './front-page.reducer';
import * as fromSkillsPage from './skills.reducer';
import * as fromProjectDetailPage from './project-detail-page.reducer';
import * as fromResumePage from './resume-page.reducer';
import { Project } from '../models/project.view-model';

export interface State {
  project: fromProject.State;
  frontPage: fromFrontPage.State;
  skillsPage: fromSkillsPage.State;
  projectDetailPage: fromProjectDetailPage.State;
  resumePage: fromResumePage.State;
}

export const getPortfolioState = createFeatureSelector<State>('portfolio');

export const getProjectState = createSelector(
  getPortfolioState,
  (state: State) => state.project
);

export const getFrontPageState = createSelector(
  getPortfolioState,
  (state: State) => state.frontPage
);

export const getProjectsState = createSelector(
  getProjectState,
  fromProject.getProjectsState
);

export const getSkillsPageState = createSelector(
  getPortfolioState,
  (state: State) => state.skillsPage
);

export const getProjectDetailPageState = createSelector(
  getPortfolioState,
  (state: State) => state.projectDetailPage
);

export const getResumePageState = createSelector(
  getPortfolioState,
  (state: State) => state.resumePage
);

export const getProjectsLoadingState = createSelector(
  getProjectState,
  fromPortfolio.getProjectsLoadingState
);

export const getProjectSectionActiveProjectIdState = createSelector(
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

export const getProjectSectionActiveProjectState = createSelector(
  getProjectsState,
  getProjectSectionActiveProjectIdState,
  (projects: Project[], activeProjectId: string) => {
    let activeProject = projects.find((project) => project.id === activeProjectId);

    if (activeProject) {
      return activeProject;
    }

    return null;
  }
);

export const getResumePagePersonalInfoState = createSelector(
  getResumePageState,
  fromResumePage.getResumePagePersonalInfoState
);

export const getResumePageHistoryState = createSelector(
  getResumePageState,
  fromResumePage.getResumePageHistoryState
);

export const getResumePageHeadingState = createSelector(
  getResumePageState,
  fromResumePage.getResumePageHeadingState
);

export const getQuickNavTitles = createSelector(
  getFrontPageState,
  fromFrontPage.getNavTitlesState
);

export const getCurrentSectionState = createSelector(
  getFrontPageState,
  fromFrontPage.getCurrentSectionState
);

export const getProjectDetailPagePageState = createSelector(
  getProjectDetailPageState,
  fromProjectDetailPage.getProjectDetailPagePageState
);

export const getActiveProjectBlock = createSelector(
  getProjectDetailPageState,
  fromProjectDetailPage.getActiveProjectBlock
);
