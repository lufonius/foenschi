import { NavigationModel } from "./navigation.model";

export class NavigationViewModelAdapter {

  constructor(navigationModel: NavigationModel) {
    this.title = navigationModel.title;
    this.subtitle = navigationModel.subtitle;
    this.route = navigationModel.route;

    //not generating children here, because here shouldn't be any logic.
    //putting that into the reducer
  }

  id: string;
  title: string;
  subtitle: string;
  route: string;
  children: NavigationViewModelAdapter[];
  hasChildren: boolean;
}
