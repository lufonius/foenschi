import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { environment } from '../../environments/environment';
import { metaReducers, reducers } from './reducers/index';

import { NavigationEffects } from './effects/navigation.effects';

import { NavigationComponent } from './components/navigation/navigation.component';

import { SharedModule } from '../shared';
import { BurgerComponent } from './components/burger/burger.component';
import { LayoutComponent } from './containers/layout/layout.component';
import { QuickNavComponent } from './components/quick-nav/quick-nav.component';
import { NavigationElementComponent } from './components/navigation-element/navigation-element.component';
import { LoadingOverlayComponent } from './components/loading-overlay/loading-overlay.component';
import { NavigationService } from './services/navigation.service';
import { ScrollService } from './services/scroll.service';
import { ChooseLanguageComponent } from './components/choose-language/choose-language.component';
import { ChooseLanguagePageComponent } from './containers/choose-language-page/choose-language-page.component';
import { LanguageEffects } from './effects/language.effects';
import { LanguagesService } from './services/languages.service';
import { CheckLanguageGuardService } from './services/check-language-guard.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CheckCurrentLanguageGuardService } from './services/check-current-language-guard.service';
import { BaseLoadingEffects } from './effects/base-loading.effect';
import { LanguageListComponent } from './components/language-list/language-list.component';
import { PageChangeAnimationComponent } from './components/page-change-animation/page-change-animation.component';
import { PrivatePolicyComponent } from './components/private-policy/private-policy.component';
import { PrivatePolicyPageComponent } from './containers/private-policy-page.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    SharedModule,
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    EffectsModule.forRoot([NavigationEffects, LanguageEffects, BaseLoadingEffects]),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router'
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence()
  ],
  schemas: [NO_ERRORS_SCHEMA],
  declarations: [
    NavigationComponent,
    BurgerComponent,
    LayoutComponent,
    QuickNavComponent,
    NavigationElementComponent,
    LoadingOverlayComponent,
    ChooseLanguageComponent,
    ChooseLanguagePageComponent,
    NavbarComponent,
    LanguageListComponent,
    PageChangeAnimationComponent,
    PrivatePolicyComponent,
    PrivatePolicyPageComponent,
    FooterComponent
  ],
  exports: [LayoutComponent],
  providers: [
    NavigationEffects,
    NavigationService,
    LanguageEffects,
    LanguagesService,
    BaseLoadingEffects,
    CheckLanguageGuardService,
    CheckCurrentLanguageGuardService,
    ScrollService
  ]
})
export class CoreModule {}
