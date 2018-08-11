import {FrontPageComponent} from "./containers/front-page.component";
import {Routes} from "@angular/router";
import {SkillsPageComponent} from "./containers/skills-page.component";

export const PORTFOLIO_ROUTES: Routes = [
  {
    path: 'front',
    component: FrontPageComponent,
    pathMatch: 'full'
  },
  {
    path: 'about-me',
    children: [
      {
        path: 'skills',
        component: SkillsPageComponent,
        pathMatch: 'full'
      }
    ]
  }
];
