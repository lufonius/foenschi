import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';
import { Observable } from 'rxjs/index';
import { LoadSkillsPageAction } from '../actions/skills.actions';
import { SkillsPage } from '../models/skills-page.view-model';

@Component({
  selector: 'lf-skills-page',
  template: `
    <lf-skills [skillsPage]="skillsPageState$ | async"></lf-skills>
  `
})
export class SkillsPageComponent implements OnInit {
  public skillsPageState$: Observable<SkillsPage>;

  constructor(public store: Store<fromRoot.State>) {
    this.skillsPageState$ = this.store.select(fromRoot.getSkillsPageState);
  }

  ngOnInit() {
    this.store.dispatch(new LoadSkillsPageAction());
  }
}
