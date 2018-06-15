import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ProjectSection} from "../../models/project-section.view-model";

@Component({
  selector: 'lf-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent {
  @Input() projectsLoading: boolean = true;
  @Input() projectSections: ProjectSection[] = [];
  @Input() activeProjectSection: ProjectSection = null;
  @Output() activeProjectSectionIdChanged: EventEmitter<string> = new EventEmitter<string>();

  setActiveProjectSectionId(id: string) {
    this.activeProjectSectionIdChanged.emit(id);
  }
}
