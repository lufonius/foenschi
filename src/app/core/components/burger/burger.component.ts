import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'lf-burger',
	templateUrl: './burger.component.html',
	styleUrls: ['./burger.component.scss'],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BurgerComponent {
	@Output() onBurgerClick = new EventEmitter<{ x: number; y: number }>();

	burgerClicked(event) {
		this.onBurgerClick.emit(event);
	}
}
