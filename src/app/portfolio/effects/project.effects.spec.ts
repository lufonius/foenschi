import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ProjectEffects } from './project.effects';

describe('ProjectService', () => {
	let actions$: Observable<any>;
	let effects: ProjectEffects;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [ProjectEffects, provideMockActions(() => actions$)]
		});

		effects = TestBed.get(ProjectEffects);
	});

	it('should be created', () => {
		expect(effects).toBeTruthy();
	});
});
