import { Component, Input, OnInit } from '@angular/core';
import { Language } from '../../models/language.model';

@Component({
	selector: 'lf-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
	@Input() currentLanguage: string;

	constructor() {}

	ngOnInit() {}

	getPrivatePolicyLink(language: string) {
		return `/${language}/private-policy`;
	}
}
