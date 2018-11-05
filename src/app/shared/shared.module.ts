import { NgModule } from '@angular/core';
import { FlexLayoutModule } from "@angular/flex-layout";
import {
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatRippleModule
} from "@angular/material";
import { LogoComponent } from './components/logo/logo.component';
import { NotYetImplementedComponent } from './components/not-yet-implemented/not-yet-implemented.component';
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatRippleModule,
    MatInputModule,
    MatProgressSpinnerModule
  ],
  exports: [
    FlexLayoutModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatRippleModule,
    MatInputModule,
    MatProgressSpinnerModule,
    LogoComponent,
    NotYetImplementedComponent
  ],
  declarations: [
    LogoComponent,
    NotYetImplementedComponent
  ]
})
export class SharedModule { }
