import { Action } from '@ngrx/store';
import {Language} from "../models/language.model";
import {SetLoad, SetLoadFailure, SetLoadSuccess} from "./base-loading.actions";

export enum LanguageActionTypes {
  SetCurrentLanguage = '[Language] SetCurrentLanguage',
  LoadAvailableLanguages = '[Language] LoadAvailableLanguages',
  LoadAvailableLanguagesSuccess = '[Language] LoadAvailableLanguagesSuccess',
  LoadAvailableLanguageFailure = '[Language] LoadAvailableLanguageFailure'
}

export class SetCurrentLanguageAction implements Action {
  readonly type = LanguageActionTypes.SetCurrentLanguage;

  constructor(public payload: { language: string }) {}
}

export class LoadAvailableLanguagesAction extends SetLoad implements Action {
  readonly type = LanguageActionTypes.LoadAvailableLanguages;
}

export class LoadAvailableLanguagesSuccessAction extends SetLoadSuccess implements Action {
  readonly type = LanguageActionTypes.LoadAvailableLanguagesSuccess;

  constructor(public payload: { availableLanguages: Language[] }, requestId: string) {
    super();
    this.request.id = requestId;
  }
}

export class LoadAvailableLanguagesFailureAction extends SetLoadFailure implements Action {
  readonly type = LanguageActionTypes.LoadAvailableLanguageFailure;

  constructor(requestId: string, public payload?: { error: string }) {
    super();
    this.request.id = requestId;
  }
}

export type LanguageActions = SetCurrentLanguageAction |
  LoadAvailableLanguagesAction |
  LoadAvailableLanguagesSuccessAction |
  LoadAvailableLanguagesFailureAction;
