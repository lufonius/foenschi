import { ContactSection } from './contact-section.view-model';
import { ProjectsSection } from './projects-section.view-model';
import { AboutMeSection } from './about-me-section.view-model';
import { EntrySection } from './entry-section.view-model';

export interface FrontPage {
	currentSection: 'about-me' | 'entry' | 'contact' | 'projects';
	entrySection: EntrySection;
	aboutMeSection: AboutMeSection;
	projectsSection: ProjectsSection;
	contactSection: ContactSection;
}
