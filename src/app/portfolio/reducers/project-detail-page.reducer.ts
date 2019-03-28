import { Action } from '@ngrx/store';
import * as _ from 'lodash';
import {
  ProjectDetailPageActionTypes,
  ProjectDetailPageLoadSuccessAction,
  ProjectDetailPageStateAction,
  SetActiveProjectBlockAction
} from '../actions/project-detail-page.actions';
import { ProjectDetailPage } from '../models/project-detail-page.view-model';

export interface State extends ProjectDetailPage {}

export const initialState: State = {
  project: {
    id: 'appexplorer',
    title: 'AppExplorer',
    subtitle: 'This is a subtitle',
    primaryDescription: 'primary description',
    secondaryDescription: 'secondary description',
    files: [
      {
        download: 'google.ch',
        title: 'ipa.zip'
      }
    ],
    blocks: [
      {
        id: '0',
        description: 'description',
        imageUrl: '',
        title: 'title',
        order: 0
      }
    ]
  },
  file: {
    title: 'Files',
    download: 'Download'
  },
  pageState: 'info',
  activeBlock: null
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case ProjectDetailPageActionTypes.ProjectDetailPageLoadSuccess: {
      const projectDetail = (<ProjectDetailPageLoadSuccessAction>action).payload.projectDetailPage;

      projectDetail.pageState = state.pageState;
      projectDetail.activeBlock = projectDetail.project.blocks.length > 0 ? projectDetail.project.blocks[0] : null;

      return copy(projectDetail);
    }

    case ProjectDetailPageActionTypes.SetPageState: {
      const pageState = (<ProjectDetailPageStateAction>action).payload.state;

      let newState = copy(state);
      newState.pageState = pageState;

      return newState;
    }

    case ProjectDetailPageActionTypes.SetActiveProjectBlock: {
      const activeProjectBlock = (<SetActiveProjectBlockAction>action).payload.activeBlock;

      let newState = copy(state);
      newState.activeBlock = activeProjectBlock;

      return newState;
    }

    default: {
      return state;
    }
  }
}

//dangerous!
const copy = (state: State): State => {
  return {
    ...state,
    project: {
      ...state.project,
      blocks: _.cloneDeep(state.project.blocks),
      files: _.cloneDeep(state.project.files)
    },
    file: {
      ...state.file
    },
    activeBlock: {
      ...state.activeBlock
    }
  };
};

export const getProjectDetailPagePageState = (state: State) => state.pageState;
export const getActiveProjectBlock = (state: State) => state.activeBlock;
