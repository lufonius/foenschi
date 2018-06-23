import { Action } from '@ngrx/store';
import { FrontPage } from "../models/front-page.view-model";
import {
  FrontPageActionTypes,
  FrontPageLoadSuccessAction, SetActiveProjectIdAction
} from "../actions/front-page.actions";


export interface State extends FrontPage {}

export const initialState: State = {
  entrySection: {
    title: "",
    subtitle: "",
    background: ""
  },
  aboutMeSection: {
    title: "About me",
    subtitle: "some subtitle",
    background: "",
    subsections: []
  },
  projectsSection:{
    title: "Projects",
    subtitle: "What I've done",
    background: "",
    activeProjectId: null
  },
  contactSection: {
    title: "Get in touch",
    subtitle: "without touching",
    background: "",
    form: {
      emailPlaceholder: "EMail",
      messagePlaceholder: "Your message",
      namePlaceholder: "Your name",
      subjectPlaceholder: "Subject",
      submitButtonText: "Send"
    }
  }
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {

    case FrontPageActionTypes.FrontPageLoadSuccess: {
      const frontPageViewModel = (<FrontPageLoadSuccessAction>action).payload.frontPage;
      return {
        ...state,
        entrySection: {
          ...frontPageViewModel.entrySection
        },
        aboutMeSection: {
          ...frontPageViewModel.aboutMeSection
        },
        projectsSection: {
          ...frontPageViewModel.projectsSection
        },
        contactSection: {
          ...frontPageViewModel.contactSection,
          form: {
            ...frontPageViewModel.contactSection.form
          }
        }
      }
    }

    case FrontPageActionTypes.SetActiveProjectIdAction: {
      const id = (<SetActiveProjectIdAction>action).payload.id;

      let clonedState = clone(state);

      clonedState.projectsSection.activeProjectId = id;

      return clonedState;
    }

    default:
      return state;
  }
}

const clone = (state: State): State => {
  return {
    ...state,
    entrySection: {
      ...state.entrySection
    },
    aboutMeSection: {
    ...state.aboutMeSection
    },
    projectsSection: {
    ...state.projectsSection
    },
    contactSection: {
    ...state.contactSection,
        form: {
      ...state.contactSection.form
      }
    }
  }
}

export const getEntrySectionState = (state: State) => state.entrySection;
export const getAboutMeSectionState = (state: State) => state.aboutMeSection;
export const getProjectsSectionState = (state: State) => state.projectsSection;
export const getContactSectionState = (state: State) => state.contactSection;

export const getActiveProjectId = (state: State) => {
  return getProjectsSectionState(state).activeProjectId;
};

export const getContactSectionFormState = (state: State) => {
  return getContactSectionState(state).form;
};

export const getAboutMeSectionSubsectionState = (state: State) => {
  return getAboutMeSectionState(state).subsections;
}
