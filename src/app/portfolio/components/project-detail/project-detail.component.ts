import {Component, Input, OnInit} from '@angular/core';
import {Project} from "../../models/project.view-model";
import * as _ from 'lodash';
import {ProjectBlock} from "../../models/project-block.view-model";
import {ProjectDetailPage} from "../../models/project-detail-page.view-model";

@Component({
  selector: 'lf-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {

  @Input() projectDetailPage: ProjectDetailPage = null;
  @Input() projectExists: boolean = true;

  constructor() { }

  ngOnInit() {
  }

  order(blocks: ProjectBlock[]) {
    return _.orderBy(blocks, 'order', 'asc');
  }

  getBackgroundStyle(imageUrl: string) {
    return `url(${imageUrl})`;
  }

}
