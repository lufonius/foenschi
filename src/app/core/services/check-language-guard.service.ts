import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {State} from "../reducers";
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs/index";
import {Language} from "../models/language.model";
import * as fromRoot from '../reducers';
import {filter, find, map, tap} from "rxjs/internal/operators";
import {SetCurrentLanguageAction} from "../actions/language.actions";

@Injectable()
export class CheckLanguageGuardService implements CanActivate {

  private availableLanguages$: Observable<Language[]>;

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const paramLanguage = route.params.language;

    //if language from param is a valid, available language
    const obs = this.availableLanguages$.pipe(
      filter(languages => !!languages),
      map((languages: Language[]) => languages.find((language) => language.name === paramLanguage)),
      tap((language) => {
        if(language) {
          this.store.dispatch(new SetCurrentLanguageAction({language: language.name}));
        }
      }),
      map(language => !!language),
      tap((isValidLanguage) => {
        if(!isValidLanguage) {
          this.router.navigate(['choose-language']);
        }
      })
    );

    obs.subscribe(test => console.log(test));

    return obs;
  }

 constructor(private store: Store<State>, private router: Router) {
    this.availableLanguages$ = this.store.pipe(select(fromRoot.getAvailableLanguagesState));
 }
}
