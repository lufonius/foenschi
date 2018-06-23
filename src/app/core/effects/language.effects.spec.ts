import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { LanguageEffects } from './language.effects';

describe('LanguageService', () => {
  let actions$: Observable<any>;
  let effects: LanguageEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LanguageEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(LanguageEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
