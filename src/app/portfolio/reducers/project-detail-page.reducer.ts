import { Project } from '../models/project.view-model';
import {
  ProjectActionTypes,
  ProjectsLoadSuccessAction
} from '../actions/project.actions';
import { Action } from "@ngrx/store";
import * as _ from 'lodash';
import {ProjectDetailPageActionTypes, ProjectDetailPageLoadSuccessAction} from "../actions/project-detail-page.actions";
import {ProjectDetailPage} from "../models/project-detail-page.view-model";

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
        downloadUrl: 'google.ch',
        title: 'ipa.zip'
      }
    ],
    blocks: [
      {
        description: 'description',
        imageUrl: '',
        title: 'title'
      }
    ]
  },
  file: {
    title: 'Files',
    download: 'Download'
  }
};

export function reducer(
  state = initialState,
  action: Action
): State {
  switch (action.type) {

    case ProjectDetailPageActionTypes.ProjectDetailPageLoadSuccess: {
      const projectDetail = (<ProjectDetailPageLoadSuccessAction>action).payload.projectDetailPage;

      return _.cloneDeep(projectDetail);
    }

    default: {
      return state;
    }
  }
}
