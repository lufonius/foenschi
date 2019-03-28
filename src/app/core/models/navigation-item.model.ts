export interface NavigationItem {
  title: string;
  subtitle: string;
  route: string;
  children?: NavigationItem[];
}
