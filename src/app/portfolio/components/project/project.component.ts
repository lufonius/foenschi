import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ProjectSubsection} from "../../models/project-subsection.view-model";

@Component({
  selector: 'lf-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent {
  @Input() projectsLoading: boolean = true;
  @Input() projectSections: ProjectSubsection[] = [];
  @Input() activeProjectSection: ProjectSubsection = null;
  @Output() activeProjectSectionIdChanged: EventEmitter<string> = new EventEmitter<string>();

  setActiveProjectSectionId(id: string) {
    this.activeProjectSectionIdChanged.emit(id);
  }
}
