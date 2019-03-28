import { ContactSectionForm } from './contact-section-form.view-model';
import { BaseSection } from './base-section.view-model';

export interface ContactSection extends BaseSection {
	form: ContactSectionForm;
	warning: string;
	email: string;
}
