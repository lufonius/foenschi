import { Component, OnInit } from '@angular/core';
import * as fromRoot from '../reducers';
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {ResumeHistoryStep} from "../models/resume-history-step.view-model";
import {ResumePersonalInfo} from "../models/resume-personal-info.view-model";
import {LoadResumePageAction} from "../actions/resume-page.actions";

@Component({
  selector: 'lf-resume-page',
  template: `
    <lf-resume
    [history]="historyState$ | async"
    [personalInfo]="personalInfoState$ | async"
    [heading]="headingState$ | async"
    ></lf-resume>
  `
})
export class ResumePageComponent  {
  public historyState$: Observable<ResumeHistoryStep[]>;
  public personalInfoState$: Observable<ResumePersonalInfo>;
  public headingState$: Observable<{title: string, subtitle: string}>;

  constructor(public store: Store<fromRoot.State>) {
    this.historyState$ = this.store.pipe(select(fromRoot.getResumePageHistoryState));
    this.personalInfoState$ = this.store.pipe(select(fromRoot.getResumePagePersonalInfoState));
    this.headingState$ = this.store.pipe(select(fromRoot.getResumePageHeadingState));

    this.store.dispatch(new LoadResumePageAction());
  }
}
