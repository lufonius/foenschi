import {FrontPageComponent} from "./containers/front-page.component";
import {Routes} from "@angular/router";

export const PORTFOLIO_ROUTES: Routes = [{
    path: 'front',
    component: FrontPageComponent,
    pathMatch: 'full'
}];
