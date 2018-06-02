import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { StoreModule } from '@ngrx/store';
import {
  StoreRouterConnectingModule,
  routerReducer
} from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../environments/environment';
import {
  reducers,
  metaReducers
} from './reducers';

import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { EffectsModule } from "@ngrx/effects";
import { MaterialSharedModule } from "./shared";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/front',
        pathMatch: 'full'
      }
    ]),
    BrowserModule,
    BrowserAnimationsModule,
    // typescript issue here
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    CoreModule,
    MaterialSharedModule,
    PortfolioModule
  ],
  providers: [  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
