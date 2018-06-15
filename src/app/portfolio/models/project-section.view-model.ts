import { Project } from "./project.model";


export class ProjectSection {

  constructor(project: Project) {
    this.id = project.id;
    this.title = project.title;
    this.description = project.secondaryDescription;
  }

  public id: string;
  public title: string;
  public description: string;
}
