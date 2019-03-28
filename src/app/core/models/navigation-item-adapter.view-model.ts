import { NavigationItem } from './navigation-item.model';

export class NavigationItemAdapter {
  constructor(navigationModel: NavigationItem) {
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
  children: NavigationItemAdapter[];
  hasChildren: boolean;
}
