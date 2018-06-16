import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { SharedModule } from "./shared";
import { NavigationEffects } from "./core/effects/navigation.effects";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    PortfolioModule
  ],
  providers: [
    NavigationEffects
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
