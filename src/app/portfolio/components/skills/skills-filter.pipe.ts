import { Pipe, PipeTransform } from '@angular/core';
import { Skill } from '../../models/skill.view-model';
import * as _ from 'lodash';

@Pipe({
  name: 'lfSkillsFilterPipe'
})
export class SkillsFilterPipe implements PipeTransform {
  transform(value: Skill[], selectedLabels: string[]): Skill[] {
    let copy = [];

    if (selectedLabels.length > 0) {
      _.forEach(value, (item: Skill) => {
        //check if is a label existent
        let filtered = _.find(item.labels, (label: string) => {
          let filteredLabel = _.find(selectedLabels, (selectedLabel) => selectedLabel === label);
          return !!filteredLabel;
        });

        if (filtered) {
          copy.push(_.cloneDeep(item));
        }
      });

      return copy;
    } else {
      return _.cloneDeep(value);
    }
  }
}
