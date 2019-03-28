import { FrontPageComponent } from './containers/front-page.component';
import { Routes } from '@angular/router';
import { SkillsPageComponent } from './containers/skills-page.component';
import { ProjectDetailPageComponent } from './containers/project-detail-page.component';
import { ResumePageComponent } from './containers/resume-page.component';
import { QuickNavComponent } from '../core/components/quick-nav/quick-nav.component';

export const PORTFOLIO_ROUTES: Routes = [
	{
		path: 'front',
		component: FrontPageComponent,
		pathMatch: 'full',
		data: {
			showQuickNav: true
		}
	},
	{
		path: 'about-me',
		children: [
			{
				path: 'skills',
				component: SkillsPageComponent,
				pathMatch: 'full',
				data: {
					navbarType: 'minimal'
				}
			},
			{
				path: 'resume',
				component: ResumePageComponent,
				pathMatch: 'full',
				data: {
					navbarType: 'minimal'
				}
			}
		]
	},
	{
		path: 'projects/:id',
		component: ProjectDetailPageComponent,
		pathMatch: 'full',
		data: {
			navbarType: 'minimal'
		}
	}
];
