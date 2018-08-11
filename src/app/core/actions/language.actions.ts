import { Action } from '@ngrx/store';
import {Language} from "../models/language.model";

export enum LanguageActionTypes {
  setCurrentLanguage = '[Language] setCurrentLanguage',
  loadAvailableLanguages = '[Language] loadAvailableLanguages',
  loadAvailableLanguagesSuccess = '[Language] loadAvailableLanguagesSuccess',
  loadAvailableLanguageFailure = '[Language] loadAvailableLanguageFailure'
}

export class SetCurrentLanguageAction implements Action {
  readonly type = LanguageActionTypes.setCurrentLanguage;

  constructor(public payload: { language: string }) {}
}

export class LoadAvailableLanguagesAction implements Action {
  readonly type = LanguageActionTypes.loadAvailableLanguages;
}

export class LoadAvailableLanguagesSuccessAction implements Action {
  readonly type = LanguageActionTypes.loadAvailableLanguagesSuccess;

  constructor(public payload: { availableLanguages: Language[] }) {}
}

export class LoadAvailableLanguagesFailureAction implements Action {
  readonly type = LanguageActionTypes.loadAvailableLanguageFailure;

  constructor(public payload?: { error: string }) {}
}

export type LanguageActions = SetCurrentLanguageAction |
  LoadAvailableLanguagesAction |
  LoadAvailableLanguagesSuccessAction |
  LoadAvailableLanguagesFailureAction;
