import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { AboutMeEffects } from './about-me.effects';

describe('AboutMeService', () => {
  let actions$: Observable<any>;
  let effects: AboutMeEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AboutMeEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(AboutMeEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
