import { Action } from '@ngrx/store';
import { FrontPage } from "../models/front-page.view-model";
import {
  FrontPageActionTypes,
  FrontPageViewModelLoadSuccessAction
} from "../actions/front-page.actions";


export interface State extends FrontPage {}

export const initialState: State = {
  entrySection: {
    title: "",
    backgrounds: []
  },
  aboutMeSection: {
    title: "About me",
    subtitle: "some subtitle",
    backgrounds: [],
    subsections: []
  },
  projectsSection:{
    title: "Projects",
    subtitle: "What I've done",
    backgrounds: [],
    activeProjectId: null
  },
  contactSection: {
    title: "Get in touch",
    subtitle: "without touching",
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

    case FrontPageActionTypes.FrontPageViewModelLoadSuccess: {
      const frontPageViewModel = (<FrontPageViewModelLoadSuccessAction>action).payload.frontPageViewModel;
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

    default:
      return state;
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
