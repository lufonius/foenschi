import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { FrontPageComponent } from './containers/front-page.component';

import { EntryComponent } from './components/entry/entry.component';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { ContactComponent } from './components/contact/contact.component';
import { ProjectComponent } from './components/project/project.component';

import { SectionLayoutComponent } from './components/section-layout/section-layout.component';
import { SharedModule } from "../shared";

import { StepperComponent } from './components/stepper/stepper.component';
import { SubsectionComponent } from './components/subsection/subsection.component';

import * as fromProject from './reducers/project.reducer';
import { ProjectEffects } from './effects/project.effects';
import {ProjectService} from "./services/project.service";
import {FrontPageService} from "./services/front-page.service";


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'front',
        component: FrontPageComponent,
        pathMatch: 'full'
      }
    ]),
    StoreModule.forFeature('portfolio', {
      project: fromProject.reducer
    }),
    EffectsModule.forFeature([ ProjectEffects ]),
    SharedModule
  ],
  declarations: [
    FrontPageComponent,
    EntryComponent,
    AboutMeComponent,
    ContactComponent,
    ProjectComponent,
    SectionLayoutComponent,
    StepperComponent,
    SubsectionComponent
  ],
  providers : [
    FrontPageService,
    ProjectService,
    ProjectEffects
  ]
})
export class PortfolioModule { }
