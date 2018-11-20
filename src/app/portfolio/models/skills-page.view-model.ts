import { SkillGroup } from "./skill-group.view-model";

export class SkillsPage {
  groups: {[name: string]: SkillGroup};
  heading: { title: string, subtitle: string, filterPlaceholder: string };
}
