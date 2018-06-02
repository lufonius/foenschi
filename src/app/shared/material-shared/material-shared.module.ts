import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatIconModule
} from "@angular/material";

const MATERIAL_MODULES = [
  MatButtonModule,
  MatIconModule
];

@NgModule({
  imports: [
    ...MATERIAL_MODULES
  ],
  exports: [
    ...MATERIAL_MODULES
  ]
})
export class MaterialSharedModule { }
