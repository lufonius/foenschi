import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ResumeHistoryStep } from '../../models/resume-history-step.view-model';
import { ResumePersonalInfo } from '../../models/resume-personal-info.view-model';

@Component({
	selector: 'lf-resume',
	templateUrl: './resume.component.html',
	styleUrls: ['./resume.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResumeComponent {
	@Input() history: ResumeHistoryStep[] = [];
	@Input() personalInfo: ResumePersonalInfo = null;
	@Input() heading: { title: string; subtitle: string } = null;

	getBackgroundImageStyle(imageUrl: string) {
		return `url(${imageUrl})`;
	}
}
