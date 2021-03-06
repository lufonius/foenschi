import { NgModule } from '@angular/core';
import { FlexLayoutModule } from "@angular/flex-layout";
import {
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatRippleModule, MatSliderModule
} from "@angular/material";
import { LogoComponent } from './components/logo/logo.component';
import { NotYetImplementedComponent } from './components/not-yet-implemented/not-yet-implemented.component';
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import { CloseComponent } from './components/close/close.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    FlexLayoutModule,
    MatSliderModule,
    MatButtonModule,
    MatIconModule,
    MatRippleModule,
    MatInputModule,
    MatProgressSpinnerModule
  ],
  exports: [
    FlexLayoutModule,
    FormsModule,
    RouterModule,
    MatSliderModule,
    MatButtonModule,
    MatIconModule,
    MatRippleModule,
    MatInputModule,
    MatProgressSpinnerModule,
    LogoComponent,
    NotYetImplementedComponent,
    CloseComponent
  ],
  declarations: [
    LogoComponent,
    CloseComponent,
    NotYetImplementedComponent
  ]
})
export class SharedModule { }
