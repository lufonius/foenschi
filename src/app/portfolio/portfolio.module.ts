import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { FrontPageComponent } from './containers/front-page.component';

import { EntryComponent } from './components/entry/entry.component';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { ContactComponent } from './components/contact/contact.component';
import { ProjectComponent } from './components/project/project.component';
import * as fromAboutMe from './reducers/about-me.reducer';
import { AboutMeEffects } from './effects/about-me.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('aboutMe', fromAboutMe.reducer),
    EffectsModule.forFeature([AboutMeEffects])
  ],
  declarations: [
    FrontPageComponent,
    EntryComponent,
    AboutMeComponent,
    ContactComponent,
    ProjectComponent
  ]
})
export class PortfolioModule { }
