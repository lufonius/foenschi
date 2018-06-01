import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact/contact.component';
import { ProjectsComponent } from './projects/projects.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { StartComponent } from './start/start.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ContactComponent, ProjectsComponent, AboutMeComponent, StartComponent]
})
export class FrontPageModule { }
