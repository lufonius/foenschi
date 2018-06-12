import { Injectable } from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { map, catchError } from 'rxjs/operators';
import { NavigationModel } from "../models/navigation.model";
import {
  NavigationActionTypes, NavigationLoadFailureAction,
  NavigationLoadSuccessAction
} from "../actions/navigation.actions";

const NAVIGATION_MODEL: NavigationModel[] = [
  {
    title: 'About Me',
    subtitle: 'More about my person',
    route: null,
    children: [
      {
        title: 'Skills',
        subtitle: 'What I can do',
        route: '/skills',
        children: null
      }
    ]
  },
  {
    title: 'Projects',
    subtitle: 'What I\'ve done so far',
    route: null,
    children: [
      {
        title: 'AppExplorer',
        subtitle: '',
        route: '/appexplorer',
        children: null
      }
    ]
  }
];

@Injectable()
export class NavigationEffects {

  constructor(private actions$: Actions) {}

  @Effect()
  getNavigation$: Observable<Action> = this.actions$.pipe(
    ofType(NavigationActionTypes.LoadNavigation),
    map(navigation => new NavigationLoadSuccessAction(NAVIGATION_MODEL)),
    catchError(() => of(new NavigationLoadFailureAction()))
  );
}
