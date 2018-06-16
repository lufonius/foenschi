import { Action } from '@ngrx/store';


export interface State {
  availableLanguages: string[];
  currentLanguage: string;
}

export const initialState: State = {
  availableLanguages: ['de-ch', 'en-gb'],
  currentLanguage: 'de-ch'
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {

    default:
      return state;
  }
}

export const getAvailableLanguagesState = (state: State) => state.availableLanguages;
export const getCurrentLanguage = (state: State) => state.currentLanguage;
