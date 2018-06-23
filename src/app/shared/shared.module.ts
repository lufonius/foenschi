import { NgModule } from '@angular/core';
import { FlexLayoutModule } from "@angular/flex-layout";
import {
  MatButtonModule,
  MatIconModule, MatInputModule,
  MatRippleModule,
  MatTabsModule
} from "@angular/material";
import { LogoComponent } from './logo/logo.component';

const IMPORT_EXPORT = [
  FlexLayoutModule
];

const MATERIAL_MODULES = [
  MatButtonModule,
  MatIconModule,
  MatTabsModule,
  MatRippleModule,
  MatInputModule
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
