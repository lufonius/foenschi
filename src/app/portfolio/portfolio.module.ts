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

import { SubsectionComponent } from './components/subsection/subsection.component';

import * as fromProject from './reducers/project.reducer';
import { ProjectEffects } from './effects/project.effects';
import { ProjectService } from "./services/project.service";

import * as fromFrontPage from './reducers/front-page.reducer';
import { FrontPageService } from "./services/front-page.service";
import { FrontPageEffects } from './effects/front-page.effects';
import {ElementPositionDirective} from "./directives/element-position.directive";
import {ScreenCoverageDirective} from "./directives/screen-coverage.directive";
import {ScrollOffsetPercentageDirective} from "./directives/scroll-offset-percentage.directive";


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
      project: fromProject.reducer,
      frontPage: fromFrontPage.reducer
    }),
    EffectsModule.forFeature([
      ProjectEffects,
      FrontPageEffects
    ]),
    SharedModule
  ],
  declarations: [
    FrontPageComponent,
    EntryComponent,
    AboutMeComponent,
    ContactComponent,
    ProjectComponent,
    SectionLayoutComponent,
    SubsectionComponent,
    ElementPositionDirective,
    ScreenCoverageDirective,
    ScrollOffsetPercentageDirective
  ],
  providers : [
    FrontPageService,
    FrontPageEffects,
    ProjectService,
    ProjectEffects
  ]
})
export class PortfolioModule { }
