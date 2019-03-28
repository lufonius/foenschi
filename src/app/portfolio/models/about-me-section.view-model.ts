import { AboutMeSubsection } from './about-me-subsection.view-model';
import { BaseSection } from './base-section.view-model';

export interface AboutMeSection extends BaseSection {
	subsections: AboutMeSubsection[];
}
