import { ProjectBlock } from './project-block.view-model';
import { ProjectFile } from './project-files.view-model';

export interface Project {
	id: string;
	title: string;
	subtitle: string;
	primaryDescription: string;
	secondaryDescription: string;
	blocks: ProjectBlock[];
	files: ProjectFile[];
}
