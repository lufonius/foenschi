import { Project } from '../models/project.model';
import {
  ProjectActionTypes,
  ProjectsLoadSuccessAction, SetActiveProjectSectionIdAction
} from '../actions/project.actions';
import { ProjectSection } from "../models/project-section.view-model";
import { Action } from "@ngrx/store";
import * as _ from 'lodash';

export interface State {
  projects: Project[];
  projectSections: ProjectSection[];
  projectSectionsIndex: {[id: string]: ProjectSection}
  activeProjectSectionId: string;
  projectsLoading: boolean;
}

export const initialState: State = {
  projects: [],
  projectSections: [],
  projectSectionsIndex: {},
  activeProjectSectionId: null,
  projectsLoading: false
};

export function reducer(
  state = initialState,
  action: Action
): State {
  switch (action.type) {

    case ProjectActionTypes.LoadProjects: {
      return {
        ...state,
        projectsLoading: true
      }
    }

    case ProjectActionTypes.ProjectsLoadSuccess: {
      const projects = (<ProjectsLoadSuccessAction>action).payload.projects;

      let index: {[id: string]: ProjectSection} = {};
      const projectSections = adaptProjectSections(projects, index);

      return {
        ...state,
        projects: projects,
        projectSections: projectSections,
        projectSectionsIndex: index,
        projectsLoading: false
      }
    }

    case ProjectActionTypes.SetActiveProjectSectionId: {
      const id = (<SetActiveProjectSectionIdAction>action).payload.id;

      return {
        ...state,
        activeProjectSectionId: id
      }
    }

    default: {
      return state;
    }
  }
}

const adaptProjectSections = (projects: Project[], index: {[id: string]: ProjectSection}) => {
  let projectSections: ProjectSection[] = [];

  projects.forEach((project: Project) => {
    let projectSection: ProjectSection = new ProjectSection(project);
    projectSections.push(projectSection);
    index[project.id] = _.cloneDeep(projectSection);
  });

  return projectSections;
}


export const getProjectSectionsState = (state: State) => state.projectSections;
export const getActiveProjectSectionState = (state: State) => {
  return state.projectSectionsIndex[state.activeProjectSectionId];
};
export const getProjectsLoadingState = (state: State) => state.projectsLoading;
