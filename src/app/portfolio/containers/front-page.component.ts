import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';
import { SetAboutMeSectionPositionAction } from "../../core/actions/layout.actions";
import { ProjectSection } from "../models/project-section.view-model";
import { Observable } from "rxjs/index";
import * as fromPortfolio from '../reducers/index';
import {LoadProjectsAction, SetActiveProjectSectionIdAction} from "../actions/project.actions";

@Component({
  selector: 'lf-front-page',
  template: `
    <lf-entry></lf-entry>
    <lf-about-me (sectionPosition)="setSectionPosition($event)"></lf-about-me>
    <lf-project
    [projectsLoading]="projectsLoadingState$ | async"
    [activeProjectSection]="activeProjectSectionState$ | async"
    [projectSections]="projectSectionsState$ | async"
    (activeProjectSectionIdChanged)="activeProjectSectionIdChanged($event)"
    ></lf-project>
    <lf-contact></lf-contact>
  `,
  styles: []
})
export class FrontPageComponent {

  private projectSectionsState$: Observable<ProjectSection[]>;
  private activeProjectSectionState$: Observable<ProjectSection>;
  private projectsLoadingState$: Observable<boolean>;

  constructor(private store: Store<any>) {
    this.projectSectionsState$ = this.store.pipe(select(fromPortfolio.getProjectSectionsState));
    this.activeProjectSectionState$ = this.store.pipe(select(fromPortfolio.getActiveProjectSectionState));
    this.projectsLoadingState$ = this.store.pipe(select(fromPortfolio.getProjectsLoadingState));

    this.store.dispatch(new LoadProjectsAction());
  }

  setSectionPosition(position: {x: number, y: number}) {
   this.store.dispatch(new SetAboutMeSectionPositionAction(position));
  }

  activeProjectSectionIdChanged(id: string) {
    this.store.dispatch(new SetActiveProjectSectionIdAction({ id }));
  }
}
