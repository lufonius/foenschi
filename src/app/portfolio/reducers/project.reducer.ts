import { Project } from '../models/project.view-model';
import {
  ProjectActionTypes,
  ProjectsLoadSuccessAction
} from '../actions/project.actions';
import { Action } from "@ngrx/store";
import * as _ from 'lodash';

export interface State {
  projects: Project[];
  projectsLoading: boolean;
}

export const initialState: State = {
  projects: [],
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

      return {
        ...state,
        projects: projects,
        projectsLoading: false
      }
    }

    default: {
      return state;
    }
  }
}


export const getProjectsState = (state: State) => state.projects;
export const getProjectsLoadingState = (state: State) => state.projectsLoading;
