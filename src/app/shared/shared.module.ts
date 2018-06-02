import { NgModule } from '@angular/core';
import { FlexModule } from "@angular/flex-layout";

const IMPORT_EXPORT = [
  FlexModule
];

@NgModule({
  imports: [
    ...IMPORT_EXPORT
  ],
  exports: [
    ...IMPORT_EXPORT
  ]
})
export class SharedModule { }
