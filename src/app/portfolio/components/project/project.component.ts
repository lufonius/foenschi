import {
  ChangeDetectionStrategy,
  Component, ElementRef,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import {BaseSection} from "../base-section";
import {Project} from "../../models/project.view-model";
import {BaseSectionPosition} from "../base-section-position";
import {Router} from "@angular/router";

@Component({
  selector: 'lf-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectComponent extends BaseSectionPosition {

  @Input() projectsLoading: boolean = true;
  @Input() projectSections: Project[] = [];
  @Input() currentLanguage: string = null;
  @Input() activeProjectSection: Project = null;
  @Output() activeProjectSectionIdChanged: EventEmitter<string> = new EventEmitter<string>();

  constructor(public router: Router) {
    super();
  }

  setActiveProjectSectionId(id: string) {
    this.activeProjectSectionIdChanged.emit(id);
  }


  navigate(projectId: string) {
    this.router.navigate([`${this.currentLanguage}/portfolio/projects/${projectId}`]);
  }


}
