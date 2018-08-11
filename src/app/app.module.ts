import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { SharedModule } from "./shared";
import { NavigationEffects } from "./core/effects/navigation.effects";
import {RouterModule} from "@angular/router";

import { LayoutComponent } from "./core/containers/layout/layout.component";
import {ChooseLanguagePageComponent} from "./core/containers/choose-language-page/choose-language-page.component";
import {CheckLanguageGuardService} from "./core/services/check-language-guard.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      {
        path: ':language/portfolio',
        component: LayoutComponent,
        loadChildren: () => PortfolioModule,
        canActivate: [ CheckLanguageGuardService ]
      },
      {
        path: 'choose-language',
        component: ChooseLanguagePageComponent,
        pathMatch: 'full'
      },
      {
        path: '',
        redirectTo: 'choose-language',
        pathMatch: 'full'
      },
      {
        path: ':language',
        redirectTo: ':language/portfolio/front',
        pathMatch: 'full'
      }
    ]),
    CoreModule,
    SharedModule
  ],
  providers: [
    NavigationEffects
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
