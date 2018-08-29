import { NgModule } from '@angular/core';
import { FlexLayoutModule } from "@angular/flex-layout";
import {
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatRippleModule,
  MatTabsModule
} from "@angular/material";
import { LogoComponent } from './components/logo/logo.component';
import {RouterModule} from "@angular/router";

const IMPORT_EXPORT = [
  FlexLayoutModule,
  RouterModule
];

const MATERIAL_MODULES = [
  MatButtonModule,
  MatIconModule,
  MatTabsModule,
  MatRippleModule,
  MatInputModule,
  MatProgressSpinnerModule
];

@NgModule({
  imports: [
    ...IMPORT_EXPORT,
    ...MATERIAL_MODULES
  ],
  exports: [
    ...IMPORT_EXPORT,
    ...MATERIAL_MODULES,
    LogoComponent
  ],
  declarations: [ LogoComponent ]
})
export class SharedModule { }
