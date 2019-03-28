import { Component, Input } from '@angular/core';

@Component({
	selector: 'lf-not-yet-implemented',
	templateUrl: './not-yet-implemented.component.html',
	styleUrls: ['./not-yet-implemented.component.scss']
})
export class NotYetImplementedComponent {
	@Input() title: string = 'Sorry, this site is still under construction.';
	@Input() subtitle: string = 'It will be working soon.';
}
