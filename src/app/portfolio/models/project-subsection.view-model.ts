import { Project } from './project.view-model';

export class ProjectSubsection {
	constructor(project: Project) {
		this.id = project.id;
		this.title = project.title;
		this.description = project.secondaryDescription;
	}

	public id: string;
	public title: string;
	public description: string;
}
