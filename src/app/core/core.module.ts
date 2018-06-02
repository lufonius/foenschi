import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";

import { NavigationComponent } from './components/navigation/navigation.component';

import { MaterialSharedModule } from "../shared";
import { BurgerComponent } from './components/burger/burger.component';
import { LayoutComponent } from './containers/layout/layout.component';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    MaterialSharedModule
  ],
  declarations: [
    NavigationComponent,
    BurgerComponent,
    LayoutComponent
  ],
  exports: [
    LayoutComponent
  ]
})
export class CoreModule { }
