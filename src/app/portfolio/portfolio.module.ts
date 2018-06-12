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

import * as fromAboutMe from './reducers/about-me.reducer';
import { AboutMeEffects } from './effects/about-me.effects';
import { SectionLayoutComponent } from './components/section-layout/section-layout.component';
import { SharedModule } from "../shared";

import { StepperComponent } from './components/stepper/stepper.component';
import { SubsectionComponent } from './components/subsection/subsection.component';


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
    StoreModule.forFeature('aboutMe', fromAboutMe.reducer),
    EffectsModule.forFeature([AboutMeEffects]),
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
  ]
})
export class PortfolioModule { }
