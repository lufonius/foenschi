import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { NavigationEffects } from './core/effects/navigation.effects';
import { RouterModule } from '@angular/router';

import { LayoutComponent } from './core/containers/layout/layout.component';
import { ChooseLanguagePageComponent } from './core/containers/choose-language-page/choose-language-page.component';
import { CheckLanguageGuardService } from './core/services/check-language-guard.service';
import { CheckCurrentLanguageGuardService } from './core/services/check-current-language-guard.service';
import { PrivatePolicyPageComponent } from './core/containers/private-policy-page.component';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		RouterModule.forRoot([
			{
				path: ':language/portfolio',
				component: LayoutComponent,
				loadChildren: './portfolio/portfolio.module#PortfolioModule',
				canActivate: [CheckLanguageGuardService]
			},
			{
				path: 'choose-language',
				component: ChooseLanguagePageComponent,
				pathMatch: 'full'
			},
			//attention here: when the route is empty and there's already a pagevisit and ergo a choosen
			//language from beforehand, the site should switch automatically to the front page
			//a meta-reducer gets the language from the local store and should save it into the state
			{
				path: '',
				component: ChooseLanguagePageComponent,
				pathMatch: 'full',
				canActivate: [CheckCurrentLanguageGuardService]
			},
			{
				path: ':language',
				redirectTo: ':language/portfolio/front',
				pathMatch: 'full'
			},
			{
				path: ':language/private-policy',
				component: LayoutComponent,
				children: [
					{
						path: '',
						component: PrivatePolicyPageComponent
					}
				],
				data: {
					navbarType: 'minimal'
				}
			}
		]),
		CoreModule,
		SharedModule
	],
	providers: [NavigationEffects],
	bootstrap: [AppComponent]
})
export class AppModule {}
