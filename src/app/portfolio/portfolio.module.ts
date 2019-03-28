import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { FrontPageComponent } from './containers/front-page.component';

import { EntryComponent } from './components/entry/entry.component';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { ContactComponent } from './components/contact/contact.component';
import { ProjectComponent } from './components/project/project.component';

import { SectionLayoutComponent } from './components/section-layout/section-layout.component';
import { SharedModule } from '../shared';

import { SubsectionComponent } from './components/subsection/subsection.component';

import * as fromProject from './reducers/project.reducer';
import { ProjectEffects } from './effects/project.effects';
import { ProjectService } from './services/project.service';

import * as fromFrontPage from './reducers/front-page.reducer';
import { FrontPageService } from './services/front-page.service';
import { FrontPageEffects } from './effects/front-page.effects';
import { ElementPositionDirective } from './directives/element-position.directive';
import { ScreenCoverageDirective } from './directives/screen-coverage.directive';
import { ScrollOffsetPercentageDirective } from './directives/scroll-offset-percentage.directive';
import { PORTFOLIO_ROUTES } from './portfolio.routes';
import { SkillsComponent } from './components/skills/skills.component';
import { SkillsPageComponent } from './containers/skills-page.component';
import { BaseLoadingEffects } from './effects/base-loading.effects';

import * as fromSkillsPage from './reducers/skills.reducer';
import { SkillsPageEffects } from './effects/skills.effects';
import { SkillsPageService } from './services/skills-page.service';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';
import { ProjectDetailPageComponent } from './containers/project-detail-page.component';

import * as fromProjectDetailPage from './reducers/project-detail-page.reducer';
import { ProjectDetailPageEffects } from './effects/project-detail-page.effects';
import { ResumeComponent } from './components/resume/resume.component';
import { ResumePageComponent } from './containers/resume-page.component';
import { ResumePageEffects } from './effects/resume-page.effects';
import { ResumePageService } from './services/resume-page.service';
import * as fromResumePage from './reducers/resume-page.reducer';
import { GalleryControlsComponent } from './components/gallery-controls/gallery-controls.component';
import { SkillsFilterPipe } from './components/skills/skills-filter.pipe';

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(PORTFOLIO_ROUTES),
		StoreModule.forFeature('portfolio', {
			project: fromProject.reducer,
			frontPage: fromFrontPage.reducer,
			skillsPage: fromSkillsPage.reducer,
			projectDetailPage: fromProjectDetailPage.reducer,
			resumePage: fromResumePage.reducer
		}),
		EffectsModule.forFeature([
			ProjectEffects,
			FrontPageEffects,
			SkillsPageEffects,
			ProjectDetailPageEffects,
			ResumePageEffects,
			BaseLoadingEffects
		]),
		SharedModule
	],
	declarations: [
		FrontPageComponent,
		EntryComponent,
		AboutMeComponent,
		ContactComponent,
		ProjectComponent,
		SectionLayoutComponent,
		SubsectionComponent,
		ElementPositionDirective,
		ScreenCoverageDirective,
		ScrollOffsetPercentageDirective,
		SkillsComponent,
		SkillsPageComponent,
		ProjectDetailComponent,
		ProjectDetailPageComponent,
		ResumeComponent,
		ResumePageComponent,
		GalleryControlsComponent,
		SkillsFilterPipe
	],
	providers: [
		FrontPageService,
		FrontPageEffects,
		ProjectService,
		ProjectEffects,
		SkillsPageService,
		SkillsPageEffects,
		ProjectDetailPageEffects,
		ResumePageEffects,
		ResumePageService,
		BaseLoadingEffects
	]
})
export class PortfolioModule {}
