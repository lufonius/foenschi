import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";

import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { StoreRouterConnectingModule } from "@ngrx/router-store";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { AngularFireModule } from "angularfire2";
import { AngularFirestoreModule } from "angularfire2/firestore";

import { environment } from "../../environments/environment";
import {
  metaReducers,
  reducers
} from "../reducers";

import { NavigationEffects } from "./effects/navigation.effects";

import { NavigationComponent } from './components/navigation/navigation.component';

import { SharedModule } from "../shared";
import { BurgerComponent } from './components/burger/burger.component';
import { LayoutComponent } from './containers/layout/layout.component';
import { QuickNavComponent } from './components/quick-nav/quick-nav.component';
import { NavigationElementComponent } from './components/navigation-element/navigation-element.component';
import { CloseComponent } from './components/close/close.component';
import { LoadingOverlayComponent } from './components/loading-overlay/loading-overlay.component';
import {NavigationService} from "./services/navigation.service";
import {ScrollService} from "./services/scroll.service";



@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    SharedModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/front',
        pathMatch: 'full'
      }
    ]),
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    EffectsModule.forRoot([ NavigationEffects ]),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  declarations: [
    NavigationComponent,
    BurgerComponent,
    LayoutComponent,
    QuickNavComponent,
    NavigationElementComponent,
    CloseComponent,
    LoadingOverlayComponent
  ],
  exports: [
    LayoutComponent
  ],
  providers: [
    NavigationEffects,
    NavigationService,
    ScrollService
  ]
})
export class CoreModule { }
