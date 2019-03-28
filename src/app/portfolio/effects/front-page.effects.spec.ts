import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { FrontPageEffects } from './front-page.effects';

describe('FrontPageService', () => {
	let actions$: Observable<any>;
	let effects: FrontPageEffects;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [FrontPageEffects, provideMockActions(() => actions$)]
		});

		effects = TestBed.get(FrontPageEffects);
	});

	it('should be created', () => {
		expect(effects).toBeTruthy();
	});
});
