import { Injectable } from '@angular/core';
import { SectionScreenCoverage } from '../models/section-screen-coverage.model';
import { BehaviorSubject } from 'rxjs/index';
import { SectionScrollOffsetPercentageModel } from '../models/section-scroll-offset-percentage.model';

//this service is needed because dispatching an action for every scroll event consumes too much power
//(laptop getting hot!)
@Injectable()
export class ScrollService {
  public sectionScreenCoverage: SectionScreenCoverage = {
    aboutMeSection: -1,
    contactSection: -1,
    entrySection: -1,
    projectSection: -1
  };

  public sectionScrollOffsetPercentage: SectionScrollOffsetPercentageModel = {
    aboutMeSection: -1,
    contactSection: -1,
    entrySection: -1,
    projectSection: -1
  };

  public sectionScreenCoverage$: BehaviorSubject<SectionScreenCoverage> = new BehaviorSubject(
    this.sectionScreenCoverage
  );

  public sectionScrollOffsetPercentage$: BehaviorSubject<SectionScrollOffsetPercentageModel> = new BehaviorSubject<SectionScrollOffsetPercentageModel>(this.sectionScrollOffsetPercentage);

  public setSectionScreenCoverage(sectionScreenCoverage: SectionScreenCoverage) {
    this.sectionScreenCoverage = {
      ...this.sectionScreenCoverage,
      ...sectionScreenCoverage
    };

    this.sectionScreenCoverage$.next(this.sectionScreenCoverage);
  }

  public setSectionScrollOffsetPercentage(sectionScrollOffsetPercentage: SectionScrollOffsetPercentageModel) {
    this.sectionScrollOffsetPercentage = {
      ...this.sectionScrollOffsetPercentage,
      ...sectionScrollOffsetPercentage
    };

    this.sectionScrollOffsetPercentage$.next(this.sectionScrollOffsetPercentage);
  }
}
