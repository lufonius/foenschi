import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import { State } from '../../reducers';
import { Language } from '../../models/language.model';
import { Observable } from 'rxjs/index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-choose-language-page',
  templateUrl: './choose-language-page.component.html',
  styleUrls: ['./choose-language-page.component.scss']
})
export class ChooseLanguagePageComponent {
  public availableLanguages$: Observable<Language[]>;

  constructor(public store: Store<State>, public router: Router) {
    this.availableLanguages$ = this.store.pipe(select(fromRoot.getAvailableLanguagesState));
  }

  languageSelected(language: string) {
    this.router.navigate([`${language}/portfolio/front`]);
  }
}
