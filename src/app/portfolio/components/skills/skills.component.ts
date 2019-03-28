import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { SkillGroup } from '../../models/skill-group.view-model';
import { SkillsPage } from '../../models/skills-page.view-model';
import * as _ from 'lodash';
import { Skill } from '../../models/skill.view-model';
import { animate, state, style, transition, trigger } from '@angular/animations';

const EASE_IN_OUT_CIRC = 'cubic-bezier(0.075, 0.82, 0.165, 1)';

@Component({
	selector: 'lf-skills',
	templateUrl: './skills.component.html',
	styleUrls: ['./skills.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [
		trigger('flyInOut', [
			transition(':enter', [
				style({
					opacity: 0,
					transform: 'translateY(0%)'
				}),
				animate(
					`250ms`,
					style({
						opacity: 1,
						transform: 'translateX(0%)'
					})
				)
			]),
			transition(
				':leave',
				animate(
					`250ms`,
					style({
						opacity: 0,
						transform: 'translateX(-10%)'
					})
				)
			)
		])
	]
})
export class SkillsComponent {
	public labels: string[] = [];
	public selectedLabels = [];
	public allLabels: string[] = [];
	public _skillsPage: SkillsPage;

	@Input() set skillsPage(skillsPage: SkillsPage) {
		this._skillsPage = skillsPage;

		this.allLabels = [];

		//that's where denormalization would have been good ....
		_.forEach(this.skillsPage.groups, (value, key) => {
			_.forEach(value.skills, (item: Skill) => {
				this.allLabels.push(...item.labels);
			});
		});

		this.labels = _.uniq(this.allLabels);
	}

	get skillsPage(): SkillsPage {
		return this._skillsPage;
	}

	objectAsArray(obj) {
		return _.values(obj);
	}
}
