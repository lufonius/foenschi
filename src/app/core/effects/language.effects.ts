import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import * as fromRoot from '../reducers';
import { catchError, filter, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { Action, INIT, select } from '@ngrx/store';
import { Observable, of } from 'rxjs/index';
import {
	LanguageActionTypes,
	LoadAvailableLanguagesAction,
	LoadAvailableLanguagesFailureAction,
	LoadAvailableLanguagesSuccessAction
} from '../actions/language.actions';
import { LanguagesService } from '../services/languages.service';

@Injectable()
export class LanguageEffects {
	constructor(public actions$: Actions, public languagesService: LanguagesService) {}

	@Effect()
	getAvailableLanguages$: Observable<Action> = this.actions$.pipe(
		ofType(LanguageActionTypes.LoadAvailableLanguages),
		mergeMap((action) =>
			this.languagesService.getAvailableLanguages().pipe(
				map((availableLanguages) => {
					return {
						requestId: (<LoadAvailableLanguagesAction>action).request.id,
						availableLanguages
					};
				})
			)
		),
		map(
			(obj) => new LoadAvailableLanguagesSuccessAction({ availableLanguages: obj.availableLanguages }, obj.requestId)
		),
		catchError((obj) => of(new LoadAvailableLanguagesFailureAction(obj.requestId)))
	);

	//made this way because its better for debugging
	@Effect()
	getAvailableLanguagesOnInit$: Observable<Action> = this.actions$.pipe(
		ofType(ROOT_EFFECTS_INIT),
		map(() => new LoadAvailableLanguagesAction())
	);
}
