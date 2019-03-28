import { Action } from '@ngrx/store';
import {
	LanguageActions,
	LanguageActionTypes,
	LoadAvailableLanguagesSuccessAction,
	SetCurrentLanguageAction
} from '../actions/language.actions';
import { LayoutActionTypes } from '../actions/layout.actions';
import { Language } from '../models/language.model';

export interface State {
	availableLanguages: Language[];
	currentLanguage: string;
}

export const initialState: State = {
	availableLanguages: null,
	currentLanguage: null
};

export function reducer(state = initialState, action: Action): State {
	switch (action.type) {
		case LanguageActionTypes.SetCurrentLanguage: {
			const language = (<SetCurrentLanguageAction>action).payload.language;

			return {
				...state,
				currentLanguage: language
			};
		}

		case LanguageActionTypes.LoadAvailableLanguagesSuccess: {
			const availableLanguages = (<LoadAvailableLanguagesSuccessAction>action).payload.availableLanguages;

			return {
				...state,
				availableLanguages: availableLanguages
			};
		}

		default:
			return state;
	}
}

export const getAvailableLanguagesState = (state: State) => state.availableLanguages;
export const getCurrentLanguage = (state: State) => state.currentLanguage;
