import { Action } from '@ngrx/store';
import { FrontPage } from '../models/front-page.view-model';
import {
	FrontPageActionTypes,
	FrontPageLoadSuccessAction,
	SetActiveProjectIdAction
} from '../actions/front-page.actions';
import { LayoutActionTypes, SetCurrentFrontPageSectionAction } from '../../core/actions/layout.actions';

export interface State extends FrontPage {}

export const initialState: State = {
	currentSection: 'entry',
	entrySection: {
		title: '',
		subtitle: '',
		saying: '',
		navTitle: '',
		background: '',
		nextSectionText: ''
	},
	aboutMeSection: {
		title: 'About me',
		subtitle: 'some subtitle',
		background: '',
		navTitle: '',
		subsections: []
	},
	projectsSection: {
		title: 'Projects',
		subtitle: "What I've done",
		background: '',
		navTitle: '',
		activeProjectId: null
	},
	contactSection: {
		title: 'Get in touch',
		subtitle: 'without touching',
		navTitle: '',
		background: '',
		warning: '',
		email: '',
		form: {
			emailPlaceholder: 'EMail',
			messagePlaceholder: 'Your message',
			namePlaceholder: 'Your name',
			subjectPlaceholder: 'Subject',
			submitButtonText: 'Send'
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
			};
		}

		case FrontPageActionTypes.FrontPageLoadFailure: {
			console.log(action);
			break;
		}

		case FrontPageActionTypes.SetActiveProjectIdAction: {
			const id = (<SetActiveProjectIdAction>action).payload.id;

			let clonedState = clone(state);

			clonedState.projectsSection.activeProjectId = id;

			return clonedState;
		}

		case LayoutActionTypes.setCurrentFrontPageSection: {
			const currentSection = (<SetCurrentFrontPageSectionAction>action).payload.currentFrontPageSection;

			let clonedState = clone(state);

			clonedState.currentSection = currentSection;

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
	};
};

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
};

export const getNavTitlesState = (state: State) => {
	return {
		aboutme: getAboutMeSectionState(state).navTitle,
		contact: getContactSectionState(state).navTitle,
		entry: getEntrySectionState(state).navTitle,
		projects: getProjectsSectionState(state).navTitle
	};
};

export const getCurrentSectionState = (state: State) => state.currentSection;
