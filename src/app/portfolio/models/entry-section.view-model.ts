import { BaseSection } from './base-section.view-model';

export interface EntrySection extends BaseSection {
	saying: string;
	nextSectionText: string;
}
