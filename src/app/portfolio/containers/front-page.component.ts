import { Component } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable, Subject} from "rxjs/index";
import * as fromLayout from '../../core/reducers/layout.reducer';
import * as fromRoot from '../../core/reducers/index';
import * as fromPortfolio from '../reducers/index';
import {LoadProjectsAction} from "../actions/project.actions";
import {Project} from "../models/project.view-model";
import {AboutMeSubsection} from "../models/about-me-subsection.view-model";
import {ProjectsSection} from "../models/projects-section.view-model";
import {ContactSection} from "../models/contact-section.view-model";
import {LoadFrontPageAction, SetActiveProjectIdAction} from "../actions/front-page.actions";
import {
  SetAboutMeSectionPositionAction,
  SetContactSectionPositionAction,
  SetEntrySectionPositionAction,
  SetProjectsSectionPositionAction, SetQuickNavTitlesAction
} from "../../core/actions/layout.actions";
import {filter, map, mergeMap, withLatestFrom} from "rxjs/operators";
import {ProjectService} from "../services/project.service";
import {ScrollService} from "../../core/services/scroll.service";
import {EntrySection} from "../models/entry-section.view-model";

@Component({
  selector: 'lf-front-page',
  template: `
    <lf-entry
    lfScrollOffsetPercentage
    (scrollOffsetPercentage)="setEntrySectionScrollOffset($event)"
    lfScreenCoverage
    (screenCoverage)="setEntrySectionScreenCoverage($event)"
    lfElementPosition
    (sectionPosition)="setEntrySectionPosition($event)"
    (goToNextSection)="goToAboutMeSection()"
    [title]="(entrySectionState$ | async).title"
    [subtitle]="(entrySectionState$ | async).subtitle"
    [background]="(entrySectionState$ | async).background"
    [saying]="(entrySectionState$ | async).saying"
    [nextSectionText]="(entrySectionState$ | async).nextSectionText">
    </lf-entry>
    
    <lf-about-me 
    lfScrollOffsetPercentage
    (scrollOffsetPercentage)="setAboutMeSectionScrollOffset($event)"
    lfScreenCoverage
    (screenCoverage)="setAboutMeSectionScreenCoverage($event)"
    lfElementPosition
    (sectionPosition)="setAboutMeSectionPosition($event)"
    (goToNextSection)="goToProjectSection()"
    (goToPreviousSection)="goToEntrySection()"
    isFirstSection="false"
    isLastSection="false"
    [title]="(aboutMeSectionState$ | async).title"
    [subtitle]="(aboutMeSectionState$ | async).subtitle"
    [background]="(aboutMeSectionState$ | async).background"
    [subsections]="aboutMeSubsectionState$ | async"
    [currentLanguage]="currentLanguage$ | async"
    placeInOrder="01">
    </lf-about-me>
    
    <lf-project
    lfScrollOffsetPercentage
    (scrollOffsetPercentage)="setProjectSectionScrollOffset($event)"
    lfScreenCoverage
    (screenCoverage)="setProjectSectionScreenCoverage($event)"
    lfElementPosition
    (sectionPosition)="setProjectSectionPosition($event)"
    (goToNextSection)="goToContactSection()"
    (goToPreviousSection)="goToAboutMeSection()"
    isFirstSection="false"
    isLastSection="false"
    [title]="(projectsSectionState$ | async).title"
    [subtitle]="(projectsSectionState$ | async).subtitle"
    [projectsLoading]="projectsLoadingState$ | async"
    [projectSections]="projectsState$ | async"
    [background]="(projectsSectionState$ | async).background"
    [currentLanguage]="currentLanguage$ | async"
    [activeProjectSection]="activeProjectState$ | async"
    (activeProjectSectionIdChanged)="activeProjectSectionIdChanged($event)"
    placeInOrder="02">
    </lf-project>
    
    
    <lf-contact
    lfScrollOffsetPercentage
    (scrollOffsetPercentage)="setContactSectionScrollOffset($event)"
    lfScreenCoverage
    (screenCoverage)="setContactSectionScreenCoverage($event)"
    lfElementPosition
    (sectionPosition)="setContactSectionPosition($event)"
    (goToPreviousSection)="goToProjectSection()"
    isFirstSection="false"
    isLastSection="true"
    [title]="(contactSectionState$ | async).title"
    [subtitle]="(contactSectionState$ | async).subtitle"
    [background]="(contactSectionState$ | async).background"
    [namePlaceholder]="(contactSectionState$ | async).form.namePlaceholder"
    [emailPlaceholder]="(contactSectionState$ | async).form.emailPlaceholder"
    [subjectPlaceholder]="(contactSectionState$ | async).form.subjectPlaceholder"
    [messagePlaceholder]="(contactSectionState$ | async).form.messagePlaceholder"
    [submitButtonText]="(contactSectionState$ | async).form.submitButtonText"
    [warning]="(contactSectionState$ | async).warning"
    [email]="(contactSectionState$ | async).email"
    placeInOrder="03"
    ></lf-contact>
  `,
  styles: [
    `
      lf-contact, lf-entry, lf-about-me, lf-project, lf-entry {
        display: block;
      }
    `
  ]
})
export class FrontPageComponent {

  public projectsState$: Observable<Project[]>;
  public activeProjectState$: Observable<Project>;
  public projectsLoadingState$: Observable<boolean>;
  public entrySectionState$: Observable<EntrySection>;
  public aboutMeSectionState$: Observable<AboutMeSubsection>;
  public aboutMeSubsectionState$: Observable<AboutMeSubsection[]>;
  public projectsSectionState$: Observable<ProjectsSection>;
  public contactSectionState$: Observable<ContactSection>;
  public currentLanguage$: Observable<string>;
  public sectionPositionsState$: Observable<fromLayout.SectionPositionsState>;
  public moveToSection$: Subject<(sectionPositions) => {x: number, y: number}> = new Subject();

  constructor(
    public store: Store<any>,
    public scrollService: ScrollService
  ) {

    this.projectsLoadingState$ = this.store.pipe(select(fromPortfolio.getProjectsLoadingState));
    this.projectsState$ = this.store.pipe(select(fromPortfolio.getProjectsState));
    this.activeProjectState$ = this.store.pipe(select(fromPortfolio.getProjectSectionActiveProjectState));
    this.entrySectionState$ = this.store.pipe(select(fromPortfolio.getEntrySectionState));
    this.aboutMeSectionState$ = this.store.pipe(select(fromPortfolio.getAboutMeSectionState));
    this.aboutMeSubsectionState$ = this.store.pipe(select(fromPortfolio.getAboutMeSectionSubsectionState));
    this.projectsSectionState$ = this.store.pipe(select(fromPortfolio.getProjectSectionState));
    this.contactSectionState$ = this.store.pipe(select(fromPortfolio.getContactSectionState));
    this.currentLanguage$ = this.store.pipe(select(fromRoot.getCurrentLanguageState));

    this.sectionPositionsState$ = this.store.pipe(
      select(fromRoot.getSectionPositionsState),
      filter(value => !!value)
    );


    this.store.dispatch(new LoadProjectsAction());
    this.store.dispatch(new LoadFrontPageAction());

    this.setInitialActiveProjectId();
    this.registerScrollToSectionOnChange();
    this.registerQuickNavTitlesOnChange();
    this.registerCurrentSectionOnChange();
  }

  registerCurrentSectionOnChange() {
    this.store.pipe(select(fromPortfolio.getCurrentSectionState))
      .subscribe(currentSectionState => {
        switch(currentSectionState) {
          case 'about-me': { this.goToAboutMeSection(); break; }
          case 'contact': { this.goToContactSection(); break; }
          case 'projects': { this.goToProjectSection(); break; }
          case 'entry': { this.goToEntrySection(); break; }
        }
      });
  }

  registerQuickNavTitlesOnChange() {
    this.store.pipe(select(fromPortfolio.getQuickNavTitles))
      .subscribe(quickNavTitles =>
        this.store.dispatch(new SetQuickNavTitlesAction({ quickNavTitles: quickNavTitles }))
      );
  }

  registerScrollToSectionOnChange() {
    // a stream of functions. when you want to go to a new section, pass a strategy which is gonna return he section position
    this.moveToSection$
      .pipe(
        withLatestFrom(
          //der letzte wert von sectionpositionstate
          this.sectionPositionsState$,
          (accessor, sectionPositions) => { return { sectionPositions, accessor } }
        ),
        filter(obj => !!(obj.accessor(obj.sectionPositions))),
        map(obj => obj.accessor(obj.sectionPositions))
      )
      .subscribe((position: {x: number, y: number}) => {
        window.scrollTo({ left: position.x, top: position.y, behavior: "smooth"});
      });
  }

  setInitialActiveProjectId() {
    let initialActiveProjectId$ = this.activeProjectState$.pipe(
      filter(project => (!project)),
      mergeMap(project => this.projectsState$),
      filter(projects => (projects && projects.length > 0)),
      map(projects => projects[0].id)
    );

    initialActiveProjectId$.subscribe(initialId => {
      this.store.dispatch(new SetActiveProjectIdAction({ id: initialId }))
    });
  }

  activeProjectSectionIdChanged(id: string) {
    this.store.dispatch(new SetActiveProjectIdAction({ id }));
  }

  setAboutMeSectionPosition(position: {x: number, y: number}) {
   this.store.dispatch(new SetAboutMeSectionPositionAction({ position }));
  }

  setProjectSectionPosition(position: {x: number, y: number}) {
    this.store.dispatch(new SetProjectsSectionPositionAction({ position }));
  }

  setEntrySectionPosition(position: {x: number, y: number}) {
    this.store.dispatch(new SetEntrySectionPositionAction({ position }));
  }

  setContactSectionPosition(position: {x: number, y: number}) {
    this.store.dispatch(new SetContactSectionPositionAction({ position }));
  }

  goToEntrySection() {
    this.goToSection(section => section.entrySectionPosition);
  }

  goToAboutMeSection() {
    this.goToSection(section => section.aboutMeSectionPosition);
  }

  goToProjectSection() {
    this.goToSection(section => section.projectsSectionPosition);
  }

  goToContactSection() {
    this.goToSection(section => section.contactSectionPosition);
  }

  goToSection(accessor: (sectionPosition: fromLayout.SectionPositionsState) => {x: number, y: number})  {
    this.moveToSection$.next(accessor);
  }

  setEntrySectionScreenCoverage(coverage: number) {
    this.scrollService.setSectionScreenCoverage({ entrySection: coverage });
  }

  setAboutMeSectionScreenCoverage(coverage: number) {
    this.scrollService.setSectionScreenCoverage({ aboutMeSection: coverage });
  }

  setContactSectionScreenCoverage(coverage: number) {
    this.scrollService.setSectionScreenCoverage({ contactSection: coverage });
  }

  setProjectSectionScreenCoverage(coverage: number) {
    this.scrollService.setSectionScreenCoverage({ projectSection: coverage });
  }

  setEntrySectionScrollOffset(coverage: number) {
    this.scrollService.setSectionScrollOffsetPercentage({ entrySection: coverage });
  }

  setAboutMeSectionScrollOffset(coverage: number) {
    this.scrollService.setSectionScrollOffsetPercentage({ aboutMeSection: coverage });
  }

  setContactSectionScrollOffset(coverage: number) {
    this.scrollService.setSectionScrollOffsetPercentage({ contactSection: coverage });
  }

  setProjectSectionScrollOffset(coverage: number) {
    this.scrollService.setSectionScrollOffsetPercentage({ projectSection: coverage });
  }
}
