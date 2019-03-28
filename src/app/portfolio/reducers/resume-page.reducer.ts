import { Action } from '@ngrx/store';
import * as _ from 'lodash';
import { ResumePage } from '../models/resume-page.view-model';
import { ResumePageActionTypes, ResumePageLoadSuccessAction } from '../actions/resume-page.actions';

export interface State extends ResumePage {}

export const initialState: State = {
	personalInfo: {
		fields: [],
		imageUrl: ''
	},
	history: [],
	heading: {
		title: '',
		subtitle: ''
	}
};

export function reducer(state = initialState, action: Action): State {
	switch (action.type) {
		case ResumePageActionTypes.ResumePageLoadSuccess: {
			const resumePage = (<ResumePageLoadSuccessAction>action).payload.resumePage;

			return _.cloneDeep(resumePage);
		}

		default: {
			return state;
		}
	}
}

export const getResumePageHistoryState = (state: State) => state.history;
export const getResumePagePersonalInfoState = (state: State) => state.personalInfo;
export const getResumePageHeadingState = (state: State) => state.heading;
