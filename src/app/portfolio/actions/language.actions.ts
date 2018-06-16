import { Action } from '@ngrx/store';

export enum LanguageActionTypes {
  LoadLanguages = '[Language] Load Languages'
}

export class Language implements Action {
  readonly type = LanguageActionTypes.LoadLanguages;
}

export type LanguageActions = Language;
