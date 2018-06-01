import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { AboutMe } from '../models/about-me.model';

export enum AboutMeActionTypes {
  LoadAboutMes = '[AboutMe] Load AboutMes'
}

export class LoadAboutMes implements Action {
  readonly type = AboutMeActionTypes.LoadAboutMes;

  constructor(public payload: { aboutMes: AboutMe[] }) {}
}

export type AboutMeActions =
 LoadAboutMes;
