import { Project } from './project.view-model';
import { ProjectFile } from './project-files.view-model';
import { ProjectBlock } from './project-block.view-model';

export class ProjectDetailPage {
  project: Project;
  file: ProjectFile;
  pageState: 'gallery' | 'info';
  activeBlock: ProjectBlock;
}
