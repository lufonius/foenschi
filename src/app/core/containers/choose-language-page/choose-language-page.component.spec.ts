import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseLanguagePageComponent } from './choose-language-page.component';

describe('ChooseLanguagePageComponent', () => {
	let component: ChooseLanguagePageComponent;
	let fixture: ComponentFixture<ChooseLanguagePageComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ChooseLanguagePageComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ChooseLanguagePageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
