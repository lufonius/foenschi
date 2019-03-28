import { Directive, ElementRef, EventEmitter, Output } from '@angular/core';

@Directive({ selector: '[lfElementPosition]' })
export class ElementPositionDirective {
	@Output() sectionPosition: EventEmitter<{ x: number; y: number }> = new EventEmitter<{ x: number; y: number }>();

	constructor(public element: ElementRef) {}

	ngAfterViewInit() {
		let x: number = this.element.nativeElement.offsetLeft;
		let y: number = this.element.nativeElement.offsetTop;

		this.sectionPosition.emit({ x, y });
	}

	emitSectionPosition(position) {
		this.sectionPosition.emit(position);
	}
}
