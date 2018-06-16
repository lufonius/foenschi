import { Component } from '@angular/core';
import {select, Store} from '@ngrx/store';
import { Observable } from "rxjs/index";
import * as fromPortfolio from '../reducers/index';
import {LoadProjectsAction} from "../actions/project.actions";
import {Project} from "../models/project.view-model";
import {AboutMeSubsection} from "../models/about-me-subsection.view-model";
import {ProjectsSection} from "../models/projects-section.view-model";
import {ContactSection} from "../models/contact-section.view-model";
import {LoadFrontPageViewModelAction} from "../actions/front-page.actions";

@Component({
  selector: 'lf-front-page',
  template: `
    <lf-entry></lf-entry>
    <lf-about-me (sectionPosition)="setSectionPosition($event)"></lf-about-me>
    <lf-project></lf-project>
    <lf-contact></lf-contact>
  `,
  styles: []
})
export class FrontPageComponent {

  private projectsState$: Observable<Project[]>;
  private projectsLoadingState$: Observable<boolean>;

  private aboutMeSectionState$: Observable<AboutMeSubsection>;
  private aboutMeSubsectionState$: Observable<AboutMeSubsection[]>;
  private projectsSectionState$: Observable<ProjectsSection>;
  private contactSectionState$: Observable<ContactSection>;

  constructor(private store: Store<any>) {

    this.projectsLoadingState$ = this.store.pipe(select(fromPortfolio.getProjectsLoadingState));
    this.projectsState$ = this.store.pipe(select(fromPortfolio.getProjectsState));
    this.aboutMeSectionState$ = this.store.pipe(select(fromPortfolio.getAboutMeSectionState));
    this.aboutMeSubsectionState$ = this.store.pipe(select(fromPortfolio.getAboutMeSectionSubsectionState));
    this.projectsSectionState$ = this.store.pipe(select(fromPortfolio.getProjectSectionState));
    this.contactSectionState$ = this.store.pipe(select(fromPortfolio.getContactSectionState));

    this.aboutMeSectionState$.subscribe(test => console.log(test));

    this.store.dispatch(new LoadProjectsAction());
    this.store.dispatch(new LoadFrontPageViewModelAction());
  }

  setSectionPosition(position: {x: number, y: number}) {
   //this.store.dispatch(new SetAboutMeSectionPositionAction(position));
  }

  activeProjectSectionIdChanged(id: string) {
    //this.store.dispatch(new SetActiveProjectSectionIdAction({ id }));
  }
}
