import {
  Component, ElementRef,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import {BaseSection} from "../base-section";
import {Project} from "../../models/project.view-model";
import {BaseSectionPosition} from "../base-section-position";

@Component({
  selector: 'lf-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent extends BaseSectionPosition {

  @Input() projectsLoading: boolean = true;
  @Input() projectSections: Project[] = [];
  @Input() activeProjectSection: Project = null;
  @Output() activeProjectSectionIdChanged: EventEmitter<string> = new EventEmitter<string>();

  setActiveProjectSectionId(id: string) {
    this.activeProjectSectionIdChanged.emit(id);
  }
}
