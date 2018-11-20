import { Action } from '@ngrx/store';
import { FrontPage } from "../models/front-page.view-model";
import {
  FrontPageActionTypes,
  FrontPageLoadSuccessAction, SetActiveProjectIdAction
} from "../actions/front-page.actions";
import {SkillsPage} from "../models/skills-page.view-model";
import {SkillsPageActionTypes, SkillsPageLoadSuccessAction} from "../actions/skills.actions";
import * as _ from 'lodash';


export interface State extends SkillsPage {}



export const initialState: State = {
  heading: { title: "jklahsdf", subtitle: "asdfasd", filterPlaceholder: '' },
  groups: {
    "technicalSkills": {
      title: "Technische Fähigkeiten",
      skills: [
        {
          title: "Angular",
          description: "Some Description",
          level: 4,
          labels: ["Frontend", "Framework"]
        }
      ]
    }
}
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {

    case SkillsPageActionTypes.SkillsPageLoadSuccess: {
      const skillsPageViewModel = (<SkillsPageLoadSuccessAction>action).payload.skillsPage;
      return _.cloneDeep(skillsPageViewModel);
    }

    case FrontPageActionTypes.FrontPageLoadFailure: {
      console.log(action);
      break;
    }

    default:
      return state;
  }
}
