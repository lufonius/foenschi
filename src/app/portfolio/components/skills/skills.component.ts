import {Component, Input, OnInit} from '@angular/core';
import {SkillGroup} from "../../models/skill-group.view-model";
import {SkillsPage} from "../../models/skills-page.view-model";
import * as _ from 'lodash';

@Component({
  selector: 'lf-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent {

  @Input() skillsPage: SkillsPage;

  objectAsArray(obj) {
    return _.values(obj);
  }
}
