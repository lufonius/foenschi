import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";

import { NavigationComponent } from './components/navigation/navigation.component';

import {SharedModule} from "../shared";
import { BurgerComponent } from './components/burger/burger.component';
import { LayoutComponent } from './containers/layout/layout.component';
import { QuickNavComponent } from './components/quick-nav/quick-nav.component';
import { NavigationElementComponent } from './components/navigation-element/navigation-element.component';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    SharedModule
  ],
  declarations: [
    NavigationComponent,
    BurgerComponent,
    LayoutComponent,
    QuickNavComponent,
    NavigationElementComponent
  ],
  exports: [
    LayoutComponent
  ]
})
export class CoreModule { }
