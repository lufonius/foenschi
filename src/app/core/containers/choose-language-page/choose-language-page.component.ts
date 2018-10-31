import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import * as fromRoot from "../../reducers";
import {SetCurrentLanguageAction} from "../../actions/language.actions";
import {Language} from "../../models/language.model";
import {Observable, Subscription} from "rxjs/index";
import {State} from "../../reducers";
import {Router} from "@angular/router";
import {filter} from "rxjs/operators";

@Component({
  selector: 'app-choose-language-page',
  templateUrl: './choose-language-page.component.html',
  styleUrls: ['./choose-language-page.component.scss']
})
export class ChooseLanguagePageComponent {

  private availableLanguages$: Observable<Language[]>;

  constructor(private store: Store<State>, private router: Router) {
   this.availableLanguages$ = this.store.pipe(select(fromRoot.getAvailableLanguagesState));
  }

  languageSelected(language: string) {
    this.router.navigate([`${language}/portfolio/front`]);
  }
}
